import { List } from '@/components/List';
import { Loader } from '@/components/Loader';
import { Shown } from '@/components/Shown';
import { ServerStatus } from '@/models/globalModels';
import { Entry, HomeProps } from '@/models/mainModels';
import { callList } from '@/redux/actions/main';
import { RootState } from '@/redux/reducers/rootReducer';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => {
  const main = state.main;
  return {
    main: main,
  }
}

const mapDispatchToProps = {
  callList
}

const Home = ({
  callList,
  main
}: HomeProps) => {
  const router = useRouter()
  const { list, listStatus } = main;

  React.useEffect(() => {
    callList()
  }, [])

  const clickOnItem = (item: Entry) => {
    router.push(`/podcast/${item.id.attributes['im:id']}`)
  } 

  return (
    <>
      <Head>
        <title>Challenge INDITEX</title>
        <meta name="description" content="Challenge created for INDITEX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='container-flud'>
          <hr />
          <div className='container'>
            <h1>Podcaster</h1>
            {(listStatus == ServerStatus.FETCH && list) ? (
              <List onClick={clickOnItem} items={list.feed.entry} />
            ) : (
              <Shown>
                <Loader />
              </Shown>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)