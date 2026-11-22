import compilerWasmUrl from '@myriaddreamin/typst-ts-web-compiler/wasm?url';
import { buildTypstSource, FONT_FAMILY } from './typstSource.js';

const FONT_FILES = ['NotoSans-Regular.ttf', 'NotoSans-Bold.ttf'];

let engine = null;

async function getEngine() {
    if (engine) return engine;
    engine = (async () => {
        const [{ $typst, TypstSnippet }] = await Promise.all([
            import('@myriaddreamin/typst.ts/contrib/snippet'),
        ]);
        const base = import.meta.env.BASE_URL;
        const fonts = await Promise.all(
            FONT_FILES.map(async (f) => {
                const res = await fetch(`${base}fonts/${f}`);
                if (!res.ok) throw new Error(`Failed to load font ${f}`);
                return new Uint8Array(await res.arrayBuffer());
            })
        );
        $typst.setCompilerInitOptions({ getModule: () => compilerWasmUrl });
        $typst.use(TypstSnippet.disableDefaultFontAssets(), TypstSnippet.preloadFonts(fonts));
        return $typst;
    })();
    engine.catch(() => { engine = null; });
    return engine;
}

export async function generatePdfBlob(problems, config) {
    const $typst = await getEngine();
    const pdf = await $typst.pdf({ mainContent: buildTypstSource(problems, config) });
    if (!pdf) throw new Error('Typst produced no output');
    return new Blob([pdf], { type: 'application/pdf' });
}

export function prefetchPdfEngine() {
    getEngine().catch(() => {});
}

export async function exportToPDF(problems, config) {
    const blob = await generatePdfBlob(problems, config);
    const filename = `worksheet_${new Date().toISOString().split('T')[0]}.pdf`;
    const file = new File([blob], filename, { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS && navigator.canShare?.({ files: [file] })) {
        try {
            await navigator.share({ files: [file], title: filename });
            URL.revokeObjectURL(url);
            return true;
        } catch (e) {
            if (e?.name === 'AbortError') {
                URL.revokeObjectURL(url);
                return true;
            }
        }
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return true;
}

// Print the same Typst PDF through a hidden iframe so the print dialog opens directly.
// Falls back to opening the PDF in a tab where inline PDF printing isn't supported
// (mobile browsers, or browsers set to download PDFs instead of viewing them).
function printViaIframe(url) {
    return new Promise((resolve, reject) => {
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
        const cleanup = () => {
            iframe.remove();
            URL.revokeObjectURL(url);
        };
        iframe.onload = () => {
            try {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                resolve();
            } catch (e) {
                cleanup();
                reject(e);
                return;
            }
            setTimeout(cleanup, 5 * 60 * 1000);
        };
        iframe.src = url;
        document.body.appendChild(iframe);
    });
}

export async function printWorksheet(problems, config) {
    const isMobile = /Android|iP(hone|ad|od)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const canPrintInline = !isMobile && navigator.pdfViewerEnabled !== false;

    // The fallback tab is opened synchronously (before awaiting) so popup blockers allow it.
    const win = canPrintInline ? null : window.open('', '_blank');
    try {
        if (canPrintInline) {
            const blob = await generatePdfBlob(problems, config);
            try {
                await printViaIframe(URL.createObjectURL(blob));
                return;
            } catch {
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
                setTimeout(() => URL.revokeObjectURL(url), 120000);
                return;
            }
        }
        const blob = await generatePdfBlob(problems, config);
        const url = URL.createObjectURL(blob);
        if (win) win.location.href = url;
        else window.location.href = url;
        setTimeout(() => URL.revokeObjectURL(url), 120000);
    } catch (e) {
        win?.close();
        throw e;
    }
}
