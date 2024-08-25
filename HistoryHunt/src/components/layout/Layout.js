import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ContainerStyles, Typography, Spacing } from '../../constants/Theme';

export const ScreenLayout = ({ children, title }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {title && <Text style={styles.title}>{title}</Text>}
                <View style={styles.centerContainer}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const Card = ({ children, title }) => {
    return (
        <View style={ContainerStyles.cardContainer}>
            {title && <Text style={Typography.header2}>{title}</Text>}
            <View style={styles.cardContent}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ContainerStyles.screenContainer.backgroundColor,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.large,
    },
    centerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        marginTop: Spacing.medium,
    },
    title: {
        ...Typography.header1,
        marginBottom: Spacing.medium,
    },
});

export const CardContainer = ({ children }) => (
    <View style={[ContainerStyles.cardNoBorderContainer, styles.centerContainer]}>
        {children}
    </View>
);
