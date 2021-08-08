import AllAttributeCards from 'components/store/AllAttributeCards';
import AllCollectionCards from 'components/store/AllCollectionCards';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { firebase } from '../../firebase/config';

const StoreHomeScreen = () => {
    const [allStores, setAllStores] = useState([]);
    const [allCategories, setAllCategories] = useState([])

    const fetchStores = async () => {
        let allStoresArray = []
        let allStores = await firebase.firestore().collection("vendors").get()
        allStores.forEach((doc) => {
            allStoresArray.push(doc.data())
        })
        await setAllStores(allStoresArray)
    }

    const fetchCategories = async () => {
        let allCategoriesArray = []
        let allStores = await firebase.firestore().collection("categories").get()
        allStores.forEach((doc) => {
            allCategoriesArray.push(doc.data())
        })
        await setAllCategories(allCategoriesArray)
    }

    useEffect(() => {
        fetchStores()
        fetchCategories()
    }, [])

    return (
        <Container>
            <AllAttributeCards
                attributes={allCategories}
                type="category" />
            <AllAttributeCards
                type="store"
                attributes={allStores} />
            <AllCollectionCards
                type="popular" />
            <AllCollectionCards
                type="featured" />
            <AllCollectionCards
                type="free" />
        </Container>
    );
}

export default StoreHomeScreen;

const Container = styled.View`
  
`;