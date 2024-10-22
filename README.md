# OpecChats Documentation

OpecChats is a hobby project developed using the MERN stack, inspired by the WhatsApp chat app. While it shares some similarities with WhatsApp, OpecChats introduces unique features and functionalities. The project leverages the MERN stack:

- **Backend**: Built with Node.js for handling API requests and MongoDB as the database.
- **Frontend**: Uses Next.js to create a fast, SEO-friendly web application.

## Deployment

OpecChats is deployed using two platforms suitable for hobby projects and free to use:

- **Server (Node.js)**: Deployed on [Render](https://render.com/).
- **Client (Next.js)**: Deployed on [Vercel](https://vercel.com/).

To deploy the project, the server and client code are committed to the GitHub repository [webproject720](https://github.com/webproject720).

## Groups

OpecChats supports two types of groups:

- **Public Groups**: Accessible to all users without any restrictions or permissions.
- **Private Groups**: Require a code or password to join. Users must provide this information to access the group and participate in the chat.

## User Roles

There are two types of users in OpecChats:

- **Guest Users**: Can join public groups and, if they have the code, can access private groups. A temporary ID is created for guests to log in and join groups.
- **Registered Users**: Must sign up and verify their email to create an account. Registered users can create and delete public or private groups, join groups, and have their chat history recorded.

## App Routes

### `/` (Home Route)

The homepage provides options to get started as a guest or registered user, view documentation, or connect via social media links. Upon landing, two requests are made to the server to log out any existing session, whether guest or logged in.

### `/auth` (Authentication Route)

This route enables users to sign up or sign in. Email verification is required upon registration. Users can also choose to log in via Google authentication. The app utilizes server-side APIs to authenticate users and create cookies for session management.

### `/dashboard` (User Dashboard Route)

After logging in, users can access the dashboard to view their joined private groups, created groups, and account details. The dashboard allows users to create new groups, join additional groups, or log out.

### `/dashboard/group` (Group Route)

This route is accessible to both guests and verified users. It includes a search functionality to find and join groups. For private groups, users need to enter the group code to gain access. Public groups are open to all users.

## Additional Information

- **GitHub Repositories**:
  - [OpecChats (Frontend)](https://github.com/webproject720/OpecChats)
  - [OpecChatsServer (Backend)](https://github.com/webproject720/OpecChatsServer)

- **Contact**:
  - Email: [webproject720@gmail.com](mailto:webproject720@gmail.com)

---

Feel free to reach out for any questions or contributions!

