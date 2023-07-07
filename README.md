## Podcaster

Podcaster is a full responsive application to list the top 100 podcast from itunes. You can click in one of them to see more details about the author and episodes.

Clicking in an episode is going to reproduce the previewTrack

----


This application was created with 
- [Next.js](https://nextjs.org/) v.13
- [Redux](https://redux.js.org/) v.4
- [Sass](https://sass-lang.com/) v.1
- [Axios](https://axios-http.com/docs/intro) v.1
- [Bootstrap](https://getbootstrap.com/) v.5
- TypeScript
- eslint
- Node 16

## Getting Started

it's neccesary to have Node 16 for running this proyect.
It's recommended to have nvm for handling different versions of node in same machine.

----

After cloning this proyect, it's neccesary to install dependencies with:
```bash
npm install
```

## Development

For development, you can run:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Build and Production

For Production is neccesary to build the application first with:

```bash
npm run build
```

Then to serve the files you can run:


```bash
npm run start
```

## Deploy on Vercel


*Productive Link* => https://challenge-inditex.vercel.app/

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Information


#### ApiService and AllOrigin Service

The application is consuming itunes endpoints.
Sometimes Itunes block us after consuming to much data from their server, so if that endpoint goes wrong there is a retry protocol.

The retry protocol is about calling the same URL with a proxy call with AllOrigin service

This logic is this [ApiService.ts](https://github.com/Joker9090/challenge-inditex/blob/main/services/ApiService.ts) File


#### Local Data

There is a feature to save the data from endpoints inside our localstorage data, we can easily change localStorate with indexedDB or SessionStorage if we want.

Inside this file: [main.ts](https://github.com/Joker9090/challenge-inditex/blob/main/redux/actions/main.ts) you can look at this logic, also there is a function called *lessThanOneHourAgo* to check times berfore doing the recall.
It was requested to be a *lessThanOneDayAgo* but to check the behavior in those days i change that logic to one hour

#### Filtering

The SearchBar in the dashboard is filtering for Author name, Track Name, Release Date and ID, if we want to add more filter options we can take a look at this file [List.tsx](https://github.com/Joker9090/challenge-inditex/blob/main/components/List.tsx)


#### Structure

This application has the following structure
- /components/ => For all React components
- /pages/ => this folder is a convention for next to connect path resolve with main Containers in react
- /models/ => folder of models for typescript
- /styles/ => styles in Sass (those are going to be compresed in build process)
- /redux/ => Actions, Reducer, Types for redux, Also the rootReducer to connect as HOC in _app.tsx file
- /utils/ => Folder with helpers functions and parsers


## Developer notes

- 6 hours spent for now
- [Pending] => Test with cypress
- [Pending] => Add PWA behavior in next
- [Pending] => Issue with shifting in images