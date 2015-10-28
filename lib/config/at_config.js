AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: false,
    positiveValidation: false,
    positiveFeedback: false,
    showValidating: false,

    // Privacy Policy and Terms of Use
    /*privacyUrl: 'privacy',
    termsUrl: 'terms-of-use', */

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

});