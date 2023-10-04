# Pulse Industry

This repository contains source code for Pulse Inventory management web application.

## Overview

Pulse Industry Web application allows you to manage your shop/products/inventory on your web browser.

## Important Note

This web app was specifically made for mobile screens. Might not look good in your desktop browsers.

## 1. How to setup project?

Make sure you have following requirements installed on your machine.

- `node` `>=16`
- `npm` `>=8`

1. Clone this repository on your local machine
2. run `cd pulse-industry`
3. run `npm install`
4. run `npm run dev`
5. Open browser with mentioned port in mobile screen size

## Technology Stack

This project was generated using [Vite](https://vitejs.dev/guide/) with **TypeScript**. We are using [reactfire](https://github.com/FirebaseExtended/reactfire) to connect with our [Firebase](https://firebase.google.com/) based backend.

Following are the primary technologies used throughout different apps.

- **[TypeScript](https://www.typescriptlang.org/) (^4) :** Programming Language
- **[React](https://reactjs.org/docs/hello-world.html) (^18) :** UI Library (with [suspense](https://reactjs.org/docs/concurrent-mode-suspense.html))
- **[React-Router-Dom](https://reactrouter.com/desktop-web/guides/quick-start) (^6-beta) :** Routing/Navigation
- **[Tailwindcss](https://tailwindcss.com/) (^2) :** CSS
- **[ReactFire](https://github.com/FirebaseExtended/reactfire) (^4.2.3) :** React-Firebase helper
- **[React-Hook-Form](https://react-hook-form.com/) (^7.46.2) :** Input Forms
- **[Zod](https://zod.dev/) (^3.22.2) :** Input Validation

# Improvements

1. Could have added test cases
2. Would have been better with <ErrorBoundary>
3. Few animations would have made it look just like an app.

# Why React and not React-Native

Setting up react-native app from scratch is more challenging than setting up a simple react app.
It saved me a day.
