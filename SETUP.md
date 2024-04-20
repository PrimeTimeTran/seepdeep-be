# Setup Web App

It's a Nuxt3 Web app so knowledge of NodeJS, NPM, and JS is critical to success.

Git, Docker & GCP will only help.

## Steps

- Install `pinia` separately due to known bug: [Learn more](https://stackoverflow.com/a/77913047/5451285)
  - `npm i pinia`
- Install Dependencies:
  - `npm install`
- Setup env variables

  - Create `touch .env`

    ```sh
    HOST=localhost

    HOST_URL=http://localhost:3000
    API_URL=http://localhost:3000/api

    # Storage
    FILE_STORAGE_PROVIDER=gcp
    FILE_STORAGE_LOCAL_FOLDER='./'
    FILE_STORAGE_BUCKET=turboship-dev-alpha
    GOOGLE_CLOUD_PLATFORM_CREDENTIALS=W29iamVjdCBPYmplY3Rd

    # Misc
    AUTH_TOKEN_EXPIRES_IN='3650 days'
    AUTH_TOKEN_SECRET=secretsecretTaseSpray
    MONGODB_URI=mongodb://localhost:27017/turboship
    SENDGRID_API_KEY=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
    ```

    > 👨🏻‍💻 Checkout the `dev` script in `package.json` and you'll notice it specifies this file

- Configure Firebase inside of `./nuxt.config.ts`

  - Replace the `vuefire.config` key's value with your project's values.

    ```sh
    vuefire: {
      config: {
        projectId: 'turboship-dev',
        measurementId: 'G-3Y4HHYAZK7',
        messagingSenderId: '885956988672',
        storageBucket: 'turboship-dev.appspot.com',
        authDomain: 'turboship-dev.firebaseapp.com',
        databaseURL: 'https://turboship-dev-default-rtdb.firebaseio.com',
        appId: '1:885916988672:web:1cca060cfd4ac74a2eafe5',
        apiKey: 'AIzaSyBaBHq_Igg9V6xKmuNBLDWK_KputgYfSLM',
      },
    },
    ```

    > 👨🏻‍💻 Real time chat uses Firebase

- Run project `npm run dev`
- Setup git:
  - Initialize dir with `git init`.
  - Create `.gitignore` & add `node_modules`.
  - Create first commit:
    - Add initial files `git add .`
    - Create initial commit `git commit -m "Initial commit'"`
