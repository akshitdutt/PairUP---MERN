#PairUP Frontend using Vite + React

- Create a Vite + React Project and remove all the unncessary UI components that are pre-written in it. 
- Install Tailwind CSS using the official documentation. 
- Install DaisyUI using official documentation, which provides components based on Tailwind CSS. 
- Install Browser Router using React Router Dom and then start creating Routes. 
    For eg: "/login", "/profile", "/signup" and so on..

    {NOTE: Remember to use Outlet whenever using nested Routes.}

- Install Axios in order to connect backend APIs with the frontend UI components and functionality. 
- In Backend, install Cors using npm i cors and use it in the App.js. This allows the frontent and backend to work collaboratively even with different localhost ports. 
- If Backend and Frontend are not on same port or URL then it is important to whitelist the origin of frontend application in the backend's App.js cors function.  b