# React Native JWT Login/Signup Example

A simple example of JWT authentification using React Native with Expo written in TypeScript. Implements 2 navigation stacks, one for auth & an other for the main navigation (authorized).

- Uses the following API: https://github.com/M0ngi/Nodejs-Express-JWT-auth
- Uses [Expo Secure Store](https://www.npmjs.com/package/expo-secure-store) for storing JWT & User data.
- Uses [React Query](https://tanstack.com/query/v3/) for creating API hooks.
- Provides an AuthContext & provides the following actions:
  * LOGIN: Update JWT/Refresh token & user info after a login
  * RESTORE: Update the state by restoring saved user info (from storage)
  * LOGOUT: Updates state by logging out.
  * REFRESH: Updates JWT/Refresh token.
- Provides an AppContext & provides the following actions:
  * ERROR: Displays an error.
  * INFO: Displays an info.
  * RESET: Resets the app state to default (No error, no info, not loading).
  * LOAD_ON: Shows loading screen.
  * LOAD_OFF: Hides loading screen.
