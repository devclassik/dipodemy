import { homeService } from '@/api/services/home.service';
import LoadingIndicator from '@/components/LoadingIndicator';
import { ThemedText } from '@/components/ThemedText';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contentWrapper: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#27d86c',
    },
    heading2: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 8,
        color: '#27d86c',
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 12,
        color: '#333',
    },
    contactText: {
        fontSize: 16,
        lineHeight: 22,
        marginTop: 10,
    }
});

function StyledMarkdown({ content }: { content: string }) {
    if (!content) return null;

    const lines = content.split('\n');

    return (
        <>
            {lines.map((line, index) => {
                const trimmed = line.trim();

                // * Word → Heading 1
                if (trimmed.startsWith('* ')) {
                    const text = trimmed.replace('* ', '');
                    return <ThemedText key={index} style={styles.heading1}>{text}</ThemedText>;
                }
                // * Word → Heading 1
                if (trimmed.startsWith('# ')) {
                    const text = trimmed.replace('# ', '');
                    return <ThemedText key={index} style={styles.heading1}>{text}</ThemedText>;
                }
                // * Word → Heading 1
                if (trimmed.startsWith('## ')) {
                    const text = trimmed.replace('## ', '');
                    return <ThemedText key={index} style={styles.heading2}>{text}</ThemedText>;
                }

                // ** Word → Heading 2
                if (trimmed.startsWith('** ')) {
                    const text = trimmed.replace('** ', '');
                    return <ThemedText key={index} style={styles.heading2}>{text}</ThemedText>;
                }

                // Normal text
                if (trimmed === '') return null;
                return <ThemedText key={index} style={styles.paragraph}>{trimmed}</ThemedText>;
            })}
        </>
    );
}


// Component
export default function TermsModal() {
    const [loading, setLoading] = useState(true);
    const [terms, setTerms] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await homeService.TermsAndConditionsScreen();
                setTerms(res.data);
            } catch (err) {
                // console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <LoadingIndicator size="large" />;
    if (!terms) return <ThemedText>No Terms Available</ThemedText>;

    return (
        <ScrollView style={styles.contentWrapper}>
            <StyledMarkdown content={terms.content} />

            {/* Contact Info */}
            <ThemedText style={styles.contactText}>Email: {terms.contact?.email}</ThemedText>
            <ThemedText style={styles.contactText}>Phone: {terms.contact?.phone}</ThemedText>
            <ThemedText style={styles.contactText}>Address: {terms.contact?.address}</ThemedText>
        </ScrollView>
    );
}
