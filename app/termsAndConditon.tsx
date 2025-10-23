import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// --- MOCK COMPONENTS AND STYLES FOR RUNNABILITY ---
// NOTE: You should replace these with your actual components (like ThemedText)

const styles = StyleSheet.create({
    themedText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#27d86c', // Darker color for main title
    },
    heading2: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#27d86c', // Mid-tone color for sections
    },
    heading3: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 5,
        color: '#27d86c', // Mid-tone color for sections
    },
    bold: {
        fontWeight: 'bold',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginVertical: 10,
    }
});
// ----------------------------------------------------

/**
 * Basic component to render headings and paragraphs from the markdown string.
 * NOTE: Full inline parsing (like **bold**) requires a dedicated library.
 */
const MarkdownDisplay = ({ content }: any) => {
    // Split the content by line breaks
    const lines = content.split('\n');

    return (
        <ThemedView style={{borderRadius: 10, padding: 4}}>
            {lines.map((line: any, index: any) => {
                const key = `term-line-${index}`;

                // Check for H1: Starts with '# '
                if (line.trim().startsWith('# ')) {
                    const text = line.replace(/^#\s*/, '');
                    return <ThemedText key={key} style={styles.heading1}>{text}</ThemedText>;
                }

                // Check for H2: Starts with '## '
                if (line.trim().startsWith('## ')) {
                    const text = line.replace(/^##\s*/, '');
                    return <ThemedText key={key} style={styles.heading2}>{text}</ThemedText>;
                }

                if (line.trim().startsWith('* ')) {
                    const text = line.replace(/^\*\s*/, '');
                    return <ThemedText key={key} style={styles.heading3}>{text}</ThemedText>;
                }

                // Check for Horizontal Rule: Starts with '---'
                if (line.trim() === '---') {
                    return <View key={key} style={styles.line} />;
                }

                // Check for Empty Lines (to prevent rendering empty <Text>)
                if (line.trim() === '') {
                    return null;
                }

                // Default: Render as regular paragraph text
                // We'll replace bold markers (**) with empty string, but a full parser is needed for true bolding
                const cleanedLine = line.replace(/\*\*/g, '');

                return <ThemedText key={key}>{cleanedLine}</ThemedText>;
            })}
        </ThemedView>
    );
};


// Step 1: Define the content as a single multiline string using backticks
const termsAndConditionsContent = `
# Dipodemy: Terms and Conditions of Service

**Effective Date: October 24, 2025**

Welcome to [Your App Name] (the "App"), a service provided by [Your Company Name] ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your use of the App, including all courses, content, features, and services offered.

By accessing or using the App, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you may not access or use the App.

---

## 1. User Accounts and Registration

1.1. Eligibility: You must be at least [Minimum Age, e.g., 13] years old to use the App. If you are under [Age of Majority, e.g., 18], you represent that you have obtained parental or guardian permission.

1.2. Account Responsibility: You are solely responsible for maintaining the confidentiality of your account login information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.

1.3. Accuracy of Information: You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.

## 2. Content and Intellectual Property

2.1. Our Content: All content on the App, including course videos, text, graphics, trademarks, and code (excluding User Content), is owned by or licensed to us and is protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access and view the Content solely for your personal, non-commercial, educational purposes.

2.2. Restrictions: You agree not to reproduce, redistribute, transmit, assign, sell, broadcast, or create derivative works of any Content unless explicitly authorized by us.

2.3. User Content: The App may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("User Content").
    * Responsibility: You are solely responsible for your User Content and the consequences of posting or publishing it.
    * License Grant: By posting User Content, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, reproduce, process, adapt, publish, transmit, and display your User Content in connection with providing the App services.

## 3. Fees, Payments, and Refunds

3.1. Pricing: Prices for courses and subscriptions are subject to change without notice, but changes will not affect purchases already processed.

3.2. Payment: You agree to pay the fees for courses or subscriptions you purchase, and you authorize us to charge your debit or credit card or process other means of payment for those fees.

3.3. Refunds: All purchases of courses and subscriptions are subject to our refund policy, which is available at [Link to your Refund Policy Page or describe the policy here, e.g., "within 14 days of purchase if less than 10% of the course has been viewed"].

## 4. Prohibited Conduct

You agree not to use the App to:

a) Violate any applicable laws or regulations.
b) Transmit any User Content that is harassing, defamatory, vulgar, obscene, or racially/ethically offensive.
c) Harass, stalk, or threaten any other users of the App.
d) Impersonate any person or entity.
e) Interfere with or disrupt the operation of the App or the servers or networks connected to the App.
f) Attempt to gain unauthorized access to any portion of the App or any other accounts, computer systems, or networks connected to the App.

## 5. Termination

5.1. Our Right to Terminate: We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.

5.2. Effect of Termination: Upon termination, your right to use the App will immediately cease. If you wish to terminate your account, you may simply discontinue using the App.

## 6. Disclaimer of Warranties

The App is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the App or the information, Content, materials, or products included on the App. Your use of the App is at your sole risk.

## 7. Limitation of Liability

In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the App; (ii) any conduct or content of any third party on the App; (iii) any content obtained from the App.

## 8. Governing Law

These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction, e.g., the State of California, United States], without regard to its conflict of law provisions.

## 9. Changes to Terms

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our App after those revisions become effective, you agree to be bound by the revised terms.

* Contact Us

If you have any questions about these Terms, please contact us at: [Your Email Address] or [Your Physical Address].
`;

// Step 2: Use the variable in your component
export default function TermsModal() {

    return <MarkdownDisplay content={termsAndConditionsContent} />

}
