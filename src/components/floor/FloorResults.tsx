import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {floor} from 'react-native-reanimated';
import styled from 'styled-components/native';
import FloorTile from './FloorTile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FloorResults = ({
  listObject,
  floors,
  type,
  listId,
  editList,
  searched,
}) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [floorDetail, setFloorDetail] = useState(true);
  const [flag, setFlag] = useState(false);

  // pushing empty blocks to avoid irregular shapes for Searched Screen
  let indexRow = 0;
  if (floors.length === 1) {
    indexRow = 2;
  } else if (floors.length === 2) {
    indexRow = 1;
  } else if (floors.length >= 3) {
    indexRow = floors.length % 3 === 2 ? 1 : floors.length % 3 === 1 ? 2 : 0;
  }
  for (let i = 0; i < indexRow; i++) {
    // floors.push({"Ylskdjdsk3232"  emptyBlock: true, showDetail: false })
    floors = [
      ...floors,
      {
        id: `"YLJ3OGGLXFms0qaxRzWhvv"${i}`,
        emptyBlock: true,
        showDetails: false,
      },
    ];
    // floors = {
    //       ...floorCatalog, ["YLJ3OGGLXFms0qaxRzWhvv" + i]: {
    //           "emptyBlock": true
    //       }
    //   }
  }
  floors = Object.entries(floors);

  // useEffect(() => {
  //     console.log("USE EFFECT CALLED**************");

  //     let indexRow;
  //     if (floors.length === 1) {
  //         indexRow = 2;
  //     }
  //     else if (floors.length === 2) {
  //         indexRow = 1;
  //     }
  //     else if (floors.length >= 3) {
  //         indexRow = floors.length % 3 === 2 ? 1 : floors.length % 3 === 1 ? 2 : 0
  //     }
  //     for (let i = 0; i < indexRow; i++) {
  //         floors.push(["YLJ3OGGLXFms0qaxRzWh", {
  //             "emptyBlock": true,
  //             "url": {
  //                 "preview": "https://firebasestorage.googleapis.com/v0/b/arzo-e1a41.appspot.com/o/floors%2FYLJ3OGGLXFms0qaxRzWh%2Fpreview.jpg?alt=media&token=233f6a90-47de-4635-92ad-8ec14398f226",
  //                 "colorMap": "https://firebasestorage.googleapis.com/v0/b/arzo-e1a41.appspot.com/o/floors%2FYLJ3OGGLXFms0qaxRzWh%2Fcolor_map.jpg?alt=media&token=d394980b-6d2a-49b9-bfc9-b2cdbaa021d6"
  //             },
  //             "images": {
  //                 "primary": {
  //                     "original": "gs://arzo-e1a41.appspot.com/floors/YLJ3OGGLXFms0qaxRzWh/original-42da2f27-fc45-407b-9678-dc6d72c43c51",
  //                     "normalMapId": "",
  //                     "colorMapId": "color-map-d98f0d9d-525f-4d58-8174-e83ee3f1e678",
  //                     "colorMap": "gs://arzo-e1a41.appspot.com/floors/YLJ3OGGLXFms0qaxRzWh/color-map-d98f0d9d-525f-4d58-8174-e83ee3f1e678",
  //                     "normalMap": "",
  //                     "originalId": "original-42da2f27-fc45-407b-9678-dc6d72c43c51"
  //                 }
  //             },
  //             "name": {
  //                 "fr": "BC1286",
  //                 "en": "BC1286"
  //             },
  //             "status": "active",
  //             "text": {
  //                 "fr": {
  //                     "name": "BC1286"
  //                 }
  //             },

  //         }])
  //     }
  // }, [floors, selectedIndex])
  // console.log("*****FLOOR ARRAYS BEFORE DETAILS PRESSED", floors);
  //   useEffect(()=>{
  //  // do {
  //         //     floors.push('')
  //         //     floors.length++

  //         // }
  //         // while (floors.length % 3 === 0)
  //   },[floors])
  const detailsFunction = (index) => {
    // console.log("****AFTER PRESSED", floors);

    for (let i = 0; i < floors?.length; i++) {
      // if (floors[i]?.emptyBlock === false) {
      if (i === index) {
        floors[index][1].showDetail = true;
      } else {
        floors[i][1].showDetail = false;
      }
      // }
    }
    setSelectedIndex(index);
  };
  const renderItem = (item, index) => (
    <TileWrapper>
      <FloorTile
        type={type}
        listId={listId}
        editList={editList}
        floorId={searched === true ? item[1]?.id : item[0]}
        key={searched === true ? item[1]?.id : item[0]}
        listObject={listObject}
        floor={item}
        searched={searched}
        detailsFunction={detailsFunction}
        index={index}
        getSelectedIndex={getSelectedIndex}
        floorDetail={floorDetail}
        flag={flag}
      />
    </TileWrapper>
  );
  const getSelectedIndex = (value) => {
    setSelectedIndex(value);
  };
  return (
    <Container>
      <FlatList
        data={floors}
        renderItem={({item, index}) => renderItem(item, index)}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => 'key' + index}
        // extraData={floorDetail}
      />
      {/* {
                        floors.map((floor) => {
                            console.log("******SINGLE FLOOR", floor);
                            return (
                                <FloorTile
                                    type={type}
                                    listId={listId}
                                    editList={editList}
                                    floorId={searched === true ? floor[1]?.id : floor[0]}
                                    key={searched === true ? floor[1]?.id : floor[0]}
                                    listObject={listObject}
                                    floor={floor}
                                    searched={searched} />
                            )
                        })
                    } */}
    </Container>
  );
};

export default FloorResults;
const Container = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  margin: 5px;
  flex: 1;
`;
const TileWrapper = styled.View``;
