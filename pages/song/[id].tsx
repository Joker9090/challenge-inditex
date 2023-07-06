import { RootState } from "@/redux/reducers/rootReducer";
import { useRouter } from "next/router"
import { connect } from "react-redux";
import React from "react";

const mapStateToProps = (state: RootState) => {
  const main = state.main;
  return {
    main: main,
  }
}

const mapDispatchToProps = {
  
}


const Song = () => {
  const router = useRouter();

  React.useEffect(() => {
    if(router.isReady) {
      console.log("GRAB ITEM", router.query.id)    
    }
  },[router])
  return (
    <div className="Song">
      {}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)