import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/utility/Loading";
import { fetchUser } from "../store/auth-slice";

function Root() {

  const dispatch = useDispatch()

  const [ isUserFetching, setUserFetching ] = useState( true )
  const [ fetchedUser, setFetchedUser ] = useState( null )
  const isLoggedIn = useSelector( ( state ) => state.auth.userId );
  const isLoading = useSelector( ( state ) => state.loading.isLoading );


  useEffect( () => {
    dispatch( fetchUser() )
      .finally( () => {
        // console.log( 'finally' )
        setUserFetching( false )
      } )
      .then( ( { payload } ) => {
        // console.log( 'user fetched', payload )
        if ( payload?.$id )
          setFetchedUser( payload.$id )
      } )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  if ( isLoading || isUserFetching ) return <Loading loading={isLoading} />;

  // console.log( isLoading, isLoggedIn )
  if ( !isLoggedIn && !fetchedUser ) return <Navigate to="/login" />;

  return <Outlet />;
}

export default Root;
