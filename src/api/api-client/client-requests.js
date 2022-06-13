import { cwaxios } from "../../utils/axios-config";
import { addRestaurantRequest, addRestaurantSuccess, addRestaurantFailure, getRestaurantsRequest, getRestaurantsSuccess, getRestaurantsFailure } from "../../redux/types/ClientTypes";
import { getCategoriesFailure, getCategoriesRequest, getCategoriesSuccess, getMenusFailure, getMenusRequest, getMenusSuccess, getPlatesFailure, getPlatesRequest, getPlatesSuccess } from "../../redux/types/RestaurantTypes";

export const getRestaurants = (clientId, loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getRestaurantsRequest());
        cwaxios.get(`${clientId}/get-restaurants`).then((res) => {
            dispatch(getRestaurantsSuccess(res.data));
        }).catch((error) => {
            dispatch(getRestaurantsFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}
export const addRestaurant = (restaurantName, restaurantCuisines, clientId, loadingSetter = () => undefined, setNavigation = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(addRestaurantRequest());
        cwaxios.post(`${clientId}/add-restaurant`, {
            restaurantName: restaurantName,
            cuisines: restaurantCuisines
        }).then((res) => {
            dispatch(addRestaurantSuccess(res.data));
            setNavigation('/overview')
        }).catch((error) => {
            dispatch(addRestaurantFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}

export const updateRestaurantField = async (fieldObject, clientId, restaurantId, fieldSetter = () => undefined, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalEdit = () => undefined) => {
    loadingSetter(true);
    cwaxios.patch(`${clientId}/restaurant/${restaurantId}/update-restaurant`, fieldObject
    ).then((res) => {
        fieldSetter(res.data.updatedField)
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalEdit();
    })
}

export const deleteRestaurant = async (clientId, restaurantId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    cwaxios.delete(`${clientId}/restaurant/${restaurantId}/delete-restaurant`).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}

export const getMenus = (clientId, restaurantId, loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getMenusRequest());
        cwaxios.get(`${clientId}/restaurant/${restaurantId}/get-menus`).then((res) => {
            dispatch(getMenusSuccess(res.data));
        }).catch((error) => {
            dispatch(getMenusFailure(error?.response?.data?.message));
        }).finally(() => loadingSetter(false))
    }
}

export const addMenu = async (menuName, clientId, restaurantId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalAdd = () => undefined) => {
    loadingSetter(true);
    cwaxios.post(`${clientId}/restaurant/${restaurantId}/add-menu`, {
        menuName: menuName
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalAdd();
    })
}

export const deleteMenu = async (clientId, restaurantId, menuId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    cwaxios.delete(`${clientId}/restaurant/${restaurantId}/menu/${menuId}/delete-menu`).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}

export const getCategories = (clientId, restaurantId, menuId, loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getCategoriesRequest());
        cwaxios.get(`${clientId}/restaurant/${restaurantId}/menu/${menuId}/get-categories`).then((res) => {
            dispatch(getCategoriesSuccess(res.data));
        }).catch((error) => {
            dispatch(getCategoriesFailure(error?.response?.data?.message));
        }).finally(() => loadingSetter(false))
    }
}

export const addCategory = async (categoryName, clientId, restaurantId, menuId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalAdd = () => undefined) => {
    loadingSetter(true);
    cwaxios.post(`${clientId}/restaurant/${restaurantId}/menu/${menuId}/add-category`, {
        categoryName: categoryName
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalAdd();
    })
}

export const deleteCategory = async (clientId, restaurantId, menuId, categoryId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    cwaxios.delete(`${clientId}/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/delete-category`).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}

export const getPlates = (clientId, restaurantId, menuId, categoryId, loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getPlatesRequest());
        cwaxios.get(`${clientId}/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/get-plates`).then((res) => {
            dispatch(getPlatesSuccess(res.data));
        }).catch((error) => {
            dispatch(getPlatesFailure(error?.response?.data?.message));
        }).finally(() => loadingSetter(false))
    }
}

export const addPlate = async (plateName, platePrice, plateIngredients, clientId, restaurantId, menuId, categoryId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalAdd = () => undefined) => {
    loadingSetter(true);
    cwaxios.post(`${clientId}/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/add-plate`, {
        plateName: plateName,
        platePrice: platePrice,
        plateIngredients: plateIngredients
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalAdd();
    })
}

export const deletePlate = async (clientId, restaurantId, menuId, categoryId, plateId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    cwaxios.delete(`${clientId}/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/plate/${plateId}/delete-plate`).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}

export const getPlateMinimumPrice = (clientId, restaurantId, setMinimum = () => undefined, loadingSetter = () => undefined, errorSetter = () => undefined) => {
    loadingSetter(true);
    cwaxios.get(`${clientId}/restaurant/${restaurantId}/get-minimum-price-plate`).then((res) => {
        setMinimum(res?.data?.plates?.platePrice)
        errorSetter(res?.data?.message)
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
    })
}