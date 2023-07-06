import { ServerStatus } from '@/models/globalModels';
import { Entry, HomeProps, ListItemType, ListType } from '@/models/mainModels';
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
    router.push(`/song/${item.id.attributes['im:id']}`)
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
              <Loader />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const Loader = () => {
  return (
    <div className='Loader'>Loader...</div>
  )
}

export const List = ({ items, onClick }: ListType) => {
  const [filter, setFilter] = React.useState("")
  return (
    <div className='List'>
      <div className='row'>
        <div className='col-4 ms-auto'>
          <input type="text" onChange={(e) => setFilter(e.target.value)} />
        </div>
      </div>
      <div className='row'>
        {items.map((i, index) => <ListItem key={`ListItem-${index}`} onClick={onClick} item={i} />)}
      </div>
    </div>
  )
}

export const ListItem = ({ item, onClick }: ListItemType) => {
  return (
    <div className='ListItem' onClick={() => onClick(item)}>
      {item['im:name'].label}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)