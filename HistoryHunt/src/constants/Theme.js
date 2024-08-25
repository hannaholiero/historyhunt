export const Colors = {
    primary100: '#fcfcfb',
    primary500: '#6d8c60',
    primary800: '#3a4a33',
    error100: '#dad0df',
    error500: '#6d5278',
    backgroundLight: '#cde8de',
    backgroundMedium: '#cddbe7',
    backgroundDark: '#cddbe7',
    transparent: 'transparent',
};

export const Typography = {
    header1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary800,
        padding: 10,
    },
    header2: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.primary800,
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.primary500,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary100,
    },
    errorText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.error500,
    },
};

export const Spacing = {
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
};

export const ButtonStyles = {
    primary: {
        backgroundColor: Colors.transparent,
        color: Colors.primary800,
        padding: Spacing.medium,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondary: {
        backgroundColor: Colors.primary800,
        padding: Spacing.medium,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textTransform: 'uppercase',
        color: Colors.primary800,
        fontSize: Typography.buttonText.fontSize,
        fontWeight: Typography.buttonText.fontWeight,
    },
};

export const ContainerStyles = {
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        paddingHorizontal: Spacing.medium,

    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: Spacing.medium,
        marginVertical: Spacing.medium,
        shadowColor: Colors.primary800,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
    cardNoBorderContainer: {

        borderRadius: 12,
        padding: Spacing.medium,
        marginVertical: Spacing.medium,
        shadowColor: Colors.primary800,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
};
