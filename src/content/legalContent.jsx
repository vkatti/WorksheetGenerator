export function PrivacyPolicyContent() {
    return (
        <>
            <p className="info-highlight">
                <strong>Short version:</strong> WorksheetLoom has no accounts, no sign-ups, and no
                server that stores your worksheets. Everything you configure and generate happens
                directly in your browser.
            </p>

            <section>
                <h3>What we don't collect</h3>
                <ul>
                    <li>No account creation, login, email address, or password</li>
                    <li>No worksheet settings, problems, or answer keys are ever sent to or stored on a server</li>
                    <li>No tracking cookies used to identify or follow you across sites</li>
                </ul>
            </section>

            <section>
                <h3>What we do collect</h3>
                <p>
                    WorksheetLoom uses <strong>Vercel Analytics</strong> to understand anonymous,
                    aggregate usage of the site — things like which pages are visited and how many
                    people use the site, with no personally identifiable information attached. This
                    helps us improve the tool; it has no way to identify you individually.
                </p>
            </section>

            <section>
                <h3>Printing and exporting</h3>
                <p>
                    When you print a worksheet or download it as a PDF, that file is generated
                    entirely on your device using your browser's built-in capabilities. It is never
                    uploaded anywhere.
                </p>
            </section>

            <section>
                <h3>Changes to this policy</h3>
                <p>
                    If this policy ever changes — for example, if we add a feature that requires
                    sending data to a server — we'll update this page to reflect it.
                </p>
            </section>
        </>
    );
}

export function TermsOfUseContent() {
    return (
        <>
            <section>
                <h3>Using WorksheetLoom</h3>
                <p>
                    WorksheetLoom is a free tool for generating printable math and logic
                    worksheets. You're welcome to use it for personal, classroom, tutoring, or
                    homeschool purposes.
                </p>
            </section>

            <section>
                <h3>No warranty</h3>
                <p>
                    Worksheets and answer keys are generated automatically and provided "as is."
                    While we aim for accuracy, we can't guarantee every problem or answer is
                    error-free — please review generated content before relying on it for grading
                    or instruction.
                </p>
            </section>

            <section>
                <h3>Acceptable use</h3>
                <p>
                    Please don't use WorksheetLoom in any way that disrupts the service for other
                    users (for example, automated scraping or excessive load).
                </p>
            </section>

            <section>
                <h3>No liability</h3>
                <p>
                    WorksheetLoom and its creators are not liable for any damages or losses arising
                    from use of the generated content or the site itself.
                </p>
            </section>

            <section>
                <h3>Changes</h3>
                <p>
                    These terms may be updated from time to time. Continued use of the site after
                    changes means you accept the updated terms.
                </p>
            </section>
        </>
    );
}

export function FAQContent() {
    return (
        <>
            <section>
                <h3>Is my data saved anywhere?</h3>
                <p>
                    No. WorksheetLoom doesn't have accounts or a database. Your settings and
                    generated worksheets exist only in your browser tab, and disappear when you
                    close or refresh the page.
                </p>
            </section>

            <section>
                <h3>Do I need to sign up?</h3>
                <p>No. The entire tool works without creating an account or logging in.</p>
            </section>

            <section>
                <h3>Is it free?</h3>
                <p>Yes, WorksheetLoom is free to use.</p>
            </section>

            <section>
                <h3>Can I customize the problems?</h3>
                <p>
                    Yes — use the Worksheet Configuration panel to choose problem types, digit
                    ranges, number of questions, word problems, and other Advanced Settings.
                </p>
            </section>

            <section>
                <h3>Can I print or save a PDF?</h3>
                <p>
                    Yes. Once you generate a worksheet, use the Print or Download PDF buttons above
                    the preview. Both happen locally in your browser.
                </p>
            </section>

            <section>
                <h3>Does an answer key come with it?</h3>
                <p>
                    Yes, if you leave the "Include Answer Key" option enabled, it's generated
                    alongside the worksheet.
                </p>
            </section>

            <section>
                <h3>Who makes WorksheetLoom?</h3>
                <p>WorksheetLoom.com is an independent project built to make worksheet creation simple for teachers and parents.</p>
            </section>
        </>
    );
}
