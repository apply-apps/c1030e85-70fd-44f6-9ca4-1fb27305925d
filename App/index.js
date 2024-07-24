// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [fairyTale, setFairyTale] = useState('');
    const [loading, setLoading] = useState(false);
    
    const fetchFairyTale = async () => {
        setLoading(true);
        const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';
        const requestBody = {
            messages: [
                { role: 'system', content: 'You are a helpful assistant. Please create a fairy tale with the given heroes, villains, and plot.' },
                { role: 'user', content: `Hero: ${hero}, Villain: ${villain}, Plot: ${plot}` }
            ],
            model: 'gpt-4o'
        };

        try {
            const response = await axios.post(API_URL, requestBody);
            const { data } = response;
            const resultString = data.response;
            setFairyTale(resultString);
        } catch (error) {
            setFairyTale('Sorry, something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Hero"
                    value={hero}
                    onChangeText={setHero}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Villain"
                    value={villain}
                    onChangeText={setVillain}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button
                    title="Generate Fairy Tale"
                    onPress={fetchFairyTale}
                    disabled={loading}
                />
                {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
                <Text style={styles.fairyTale}>{fairyTale}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    fairyTale: {
        marginTop: 20,
        fontSize: 18,
        lineHeight: 24,
    },
});