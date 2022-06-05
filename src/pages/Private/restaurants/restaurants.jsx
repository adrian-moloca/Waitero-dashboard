import React, { useState } from "react";
import "./restaurants.jsx";
import { Box } from "@material-ui/core";
import PageContainer from "../../../components/container/page-container/page-container.jsx";
import WaiteroTextField from "../../../components/text-field/waitero-text-field.jsx";
import SearchIcon from '@material-ui/icons/Search';
import RestaurantsTable from "../../../components/RestaurantsTable/RestaurantsTable.jsx";
import { InputAdornment } from "@material-ui/core";
import AddClientModal from "../../../components/modal/add-client-modal.jsx";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import WaiteroAlert from '../../../components/alert/alert';
import { cleanErrorMessage } from "../../../redux/types/AdminTypes.jsx";

const RestaurantsPage = ({hasErrorsAdmin, messageAdmin, cleanErrorMessage }) => {

  return (
    <>
      <PageContainer>
      <Box
        width="90%"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        paddingBottom="2%"
      >
        <Box textAlign="left" fontSize="35px">
          Clienti
        </Box>
          <WaiteroAlert isError={hasErrorsAdmin} message={messageAdmin} cleanError={()=>cleanErrorMessage()}/>
          <AddClientModal/>
      </Box>
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingTop="2%"
      >
        <Box textAlign="left" fontSize="35px">
          <WaiteroTextField variant="outlined" label="Cauta un restaurant"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon/>
              </InputAdornment>
            ),
          }} />
        </Box>
      </Box>
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingTop="2%"
      >
        <RestaurantsTable/>
      </Box>
    </PageContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  hasErrorsAdmin: state.adminReducer.hasErrors,
  messageAdmin: state.adminReducer.message
})

const mapDispatchToProps = (dispatch) => ({
  cleanErrorMessage: () => dispatch(cleanErrorMessage())
})
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage));