# Welcome to BE-Commerce

BE-Commerce is an e-commerce platform built on the MERN stack, featuring React.js for front-end, Tailwind CSS for styling, and React Router for navigation. It allows users to explore products, add them to cart, and place orders via Stripe payments.

## 🚀 Key Features

- 🔒 **Advanced Authentication & Security**:  
  Role-based login with JWT, Passport.js, and Google OAuth, ensuring secure admin/user segregation and robust protection of sensitive routes.

- 🧑‍💼 **User Account Management**:  
  Hassle-free password reset via email verification, plus easy profile editing for tailored experiences.

- 📦 **Real-Time Order Tracking**:  
  Live order status timeline for transparency from checkout to delivery updates.

- 🛒 **Intuitive Cart & Product Experience**:  
  Smooth cart management, product ratings and reviews, and dynamic pagination for effortless browsing.

- 🛠️ **Comprehensive Admin Controls**:  
  Full product CRUD, user management with admin role assignment/revocation, and efficient deletion—all behind protected routes.

- 💳 **Streamlined Checkout & Payments:**  
  Integrated Stripe for secure card payments,  featuring a seamless checkout process and shimmering UI for instant feedback.

- ⚡ **Performance-Driven Architecture**:
MERN stack foundation, Redux state management, Tailwind CSS for responsive design, and Cloudinary for optimized media storage.

## 🧰 Tech Stack

### Frontend

| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="react"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="tailwindcss"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"  width="48" height="48" alt="Javascript" /> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="48" height="48" alt="vite"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="48" height="48" alt="redux"> | <img src="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg" width="48" height="48"> | <img src="https://raw.githubusercontent.com/detain/svg-logos/b02ee1ac30c7ff4757278337c95588b01ed0954b/svg/f/framer-motion.svg" width="48" height="48"> |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **React** | **Tailwind CSS** | **Javascript** | **Vite** | **Redux Toolkit** | **React Icons** | **Framer Motion** |

### Backend

| <img src="https://devicon-website.vercel.app/api/nodejs/original.svg" width="48" height="48" alt="nodejs"> | <img src="https://devicon-website.vercel.app/api/express/original.svg?color=%230085FF" width="48" height="48" alt="express"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="48" height="48" alt="mongodb"> | <img src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" width="80" height="48" alt="stripe"> | <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Cloudinary_logo.svg" width="120" height="32" alt="cloudinary"> |
|:---:|:---:|:---:|:---:|:---:|
| **Node.js** | **Express** | **MongoDB** | **Stripe API** | **Cloudinary** |

### Authentication

| <img src="https://static.cdnlogo.com/logos/j/20/jwt.svg" width="48" height="48" alt="jwt"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/passport/passport-original.svg" width="48px" height="48px" /> | <img src="https://devicon-website.vercel.app/api/google/original.svg" width="48" height="48" alt="google-oauth"> | <img src="https://raw.githubusercontent.com/nodemailer/nodemailer/master/assets/nm_logo_200x136.png" width="70" height="48" alt="nodemailer"> |
|:---:|:---:|:---:|:---:|
| **JWT** | **Passport.js** | **Google OAuth** | **Nodemailer** |

### Development Tools

| <img src="https://prettier.io/icon.png" width="48" height="48" alt="prettier"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="48" height="48" alt="eslint"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="48" height="48" alt="git"> | <img src="https://devicon-website.vercel.app/api/github/original.svg?color=%23FF0091" width="48" height="48" alt="github"> | <img src="https://avatars.githubusercontent.com/u/10251060?s=48&v=4" width="48" height="48" alt="passport.js"> |
|:---:|:---:|:---:|:---:|:---:|
| **Prettier** | **ESLint** | **Git** | **GitHub** | **Postman** |

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/thesakshijaiswal/be-commerce.git
cd be-commerce
```

### 2. Set Up Environment Variables

Create a `.env` file in `/backend`:

```
MONGODB_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_google_client_ID>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
CLOUDINARY_CLOUD_NAME=<your_clodinary_cloud_name>
CLOUDINARY_API_KEY=<your_clodinary_API_key>
CLOUDINARY_API_SECRET=<your_clodinary_API_secret>
```

---

## 🔧 Run Locally

### 🖥 Backend

```bash
cd backend
npm install
npm run dev
```

### 🌐 Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🛠️ Contributors

[![GitHub](https://img.shields.io/badge/GitHub-thesakshijaiswal-5A29E4?style=for-the-badge&logo=github)](https://github.com/thesakshijaiswal) [![GitHub](https://img.shields.io/badge/GitHub-thekiranmahajan-4a62E4?style=for-the-badge&logo=github)](https://github.com/thekiranmahajan)

If you found this project useful or inspiring, please consider ⭐️ **starring the repo** to support the work!

## 📄 License

This project is licensed under the [MIT License](LICENSE).
