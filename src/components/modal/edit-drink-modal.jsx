import React, { useState } from 'react';
import {
    Box,
    Modal,
    Fade,
    IconButton,
    CircularProgress,
} from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, SaveAlt } from '@material-ui/icons';
import { updateDrink } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import { drink_categories } from '../../utils/costants/constants';
import { ToggleButton } from '@material-ui/lab';
import { useEffect } from 'react';

const EditDrinkModal = ({
    isOpen,
    setIsOpen,
    item,
    clientId,
    restaurantId,
    drinkId,
    updateDrinkType,
}) => {
    const classes = useStyles();
    const [name, setName] = useState(item?.drinkName);
    const [price, setPrice] = useState(item?.drinkPrice?.toString());
    const [drinkCategory, setDrinkCateory] = useState(item?.drinkCategory);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: '', isError: false });

    function returnBack() {
        setIsOpen();
        setName('');
        setPrice('');
        setDrinkCateory('');
    }

    const closeModal = () => {
        updateDrinkType();
        setIsOpen(false);
    }

    function updateDrinkTypeAction() {
        updateDrink(name, parseFloat(price), drinkCategory, clientId, restaurantId, drinkId, setLoading, setError, closeModal)
        setName('');
        setPrice('');
        setDrinkCateory('');
    }

    const onCategoryClick = (category) => {
        if (drinkCategory?.length > 0 && drinkCategory === category)
            setDrinkCateory('');
        else
            setDrinkCateory(category)
    }

    useEffect(()=>{
        if(item){
            setName(item?.drinkName)
            setPrice(item?.drinkPrice?.toString())
            setDrinkCateory(item?.drinkCategory)
        }
    }, [item])

    return (
        <>
            <WaiteroAlert
                isError={error.isError}
                message={error.message}
                cleanError={() => setError({ message: '', isError: false })}
            />
            <Modal open={isOpen} onClose={() => returnBack()}>
                <Fade in={isOpen} timeout={600}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.paper}
                    >
                        <Box display="flex" mt={3}>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <Box>
                                        <Box display={'flex'}>
                                            <Box mr={2} width={400}>
                                                <WaiteroTextField
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    fullWidth
                                                />
                                            </Box>
                                            <Box mr={2} width={400}>
                                                <WaiteroTextField
                                                    placeholder="Pret"
                                                    value={price}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    fullWidth
                                                />
                                            </Box>
                                        </Box>
                                        <Box fontSize={18} marginTop={3}>
                                            Selectati o categorie
                                            <Box display={'flex'} width='100%' flexWrap={'wrap'}>
                                                {drink_categories.map((category) => {
                                                    return <ToggleButton key={category} style={{marginRight: 10, marginTop: 10, fontSize: 14}} disabled={drinkCategory?.length > 0 && drinkCategory !== category}  selected={drinkCategory === category} onChange={() => onCategoryClick(category)}>
                                                        {category}        
                                                    </ToggleButton>
                                                })}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box ml={2}>
                                        <IconButton onClick={returnBack}>
                                            <Close color="error" size={25} />
                                        </IconButton>
                                    </Box>
                                    <Box ml={2}>
                                        <IconButton
                                            onClick={() => {
                                                updateDrinkTypeAction();
                                            }}
                                        >
                                            <SaveAlt
                                                style={{
                                                    color: 'rgba(0,110,10)',
                                                    fontSize: 25,
                                                }}
                                            />
                                        </IconButton>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default EditDrinkModal;