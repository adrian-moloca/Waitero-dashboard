import React from "react";
import "./restaurants.jsx";
import { Box } from "@material-ui/core";
import PageContainer from "../../../components/container/page-container/page-container.jsx";
import PrimaryButton from "../../../components/buttons/primaryButton/primaryButton.jsx";
import WaiteroTextField from "../../../components/text-field/waitero-text-field.jsx";
import SearchIcon from '@material-ui/icons/Search';
import RestaurantsTable from "../../../components/RestaurantsTable/RestaurantsTable.jsx";
import { InputAdornment } from "@material-ui/core";

const RestaurantsPage = () => {
  return (
    <PageContainer>
      <Box
        width="90%"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        paddingBottom="2%"
      >
        <Box textAlign="left" fontSize="35px">
          Restaurante
        </Box>

        <Box sx={{ width: 334 }}>
          <PrimaryButton
            variant="contained"
            fullWidth
            color="primary"
            style={{fontWeight: "600"}}
            
          >
            ADAUGA RESTAURANT
          </PrimaryButton>
        </Box>
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
  );
};

export default RestaurantsPage;
