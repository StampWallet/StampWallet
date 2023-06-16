import React from 'react';
import * as api from '../api';
import Auth from '../database/Auth';

export const fetchLocalCards = async (callbackFn: React.Dispatch<React.SetStateAction<any[]>>) => {
  const LCA = new api.LocalCardsApi();

  try {
    const header = Auth.getAuthHeader();
    const localCardsResponse = await LCA.getLocalCardTypes(header);
    const cards = localCardsResponse.data.types.map((obj) => ({ ...obj, isAdded: false }));
    callbackFn([...cards]);
    //callbackFn([...localCardsResponse.data.types.map((obj) => ({ ...obj, isAdded: false }))]);
    //callbackFn([...localCardsResponse.data.types]);
  } catch (e) {
    console.log('error:', e);
    return callbackFn([]);
  }
};

export const fetchVirtualCards = async (
  query: string,
  callbackFn: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const UA = new api.UserApi();

  try {
    const header = Auth.getAuthHeader();
    const virtualCardsResponse = await UA.searchBusinesses(query, undefined, undefined, header);
    const { businesses } = virtualCardsResponse.data;
    const VA = new api.VirtualCardsApi();

    let virtualCards = [];

    await Promise.all(
      businesses.map(async (business) => {
        const response = await VA.getVirtualCard(business.publicId, header);
        virtualCards = [...virtualCards, { ...response.data, isAdded: false }];
      })
    );

    callbackFn(virtualCards);
  } catch (e) {
    console.log('error:', e.response);
    callbackFn([]);
  }
};

export const fetchUserCards = async (callbackFn: React.Dispatch<React.SetStateAction<any[]>>) => {
  const CA = new api.CardsApi();
  const LCA = new api.LocalCardsApi();

  try {
    const header = Auth.getAuthHeader();
    const userCardsResponse = await CA.getUserCards(header);
    if (!Object.keys(userCardsResponse.data).length) {
      return callbackFn([]);
    }

    const localCardsTypesResponse = await LCA.getLocalCardTypes(header);
    const {
      data: { types: allLocalCards },
    } = localCardsTypesResponse;

    let cardsWithImgUrl = [];

    const localCards = userCardsResponse.data?.localCards || [];
    const virtualCards = userCardsResponse.data?.virtualCards
      ? userCardsResponse.data.virtualCards.map((card) => ({
          ...card,
          isAdded: true,
        }))
      : [];

    //console.log(virtualCards);

    localCards.forEach((card) => {
      const matchingCard = allLocalCards.find((cardWithUrl) => cardWithUrl.publicId === card.type);
      cardsWithImgUrl = [
        ...cardsWithImgUrl,
        {
          ...card,
          imageUrl: matchingCard.imageUrl,
          isAdded: true,
          barcodeType: matchingCard.code.toUpperCase(),
        },
      ];
    });

    const cards = [...cardsWithImgUrl, ...virtualCards];
    return callbackFn(cards);
  } catch (e) {
    console.log('error:', e);
    return callbackFn([]);
  }
};

export const fetchNonAddedCards = async (
  callbackFn: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const CA = new api.CardsApi();
  const LCA = new api.LocalCardsApi();
  const header = Auth.getAuthHeader();
  try {
    const userCardsResponse = await CA.getUserCards(header);
    const localCardsTypesResponse = await LCA.getLocalCardTypes(header);
    if (!Object.keys(userCardsResponse.data).length) {
      return callbackFn([...localCardsTypesResponse.data.types]);
    }

    const userLocalCards = userCardsResponse.data?.localCards || [];
    const allLocalCards = localCardsTypesResponse?.data?.types || [];
    const nonUserLocalCards = allLocalCards.filter((card) =>
      userLocalCards.every((userCard) => userCard.type !== card.publicId)
    );
    return callbackFn([...nonUserLocalCards]);
  } catch (e) {
    return callbackFn([]);
  }
};

export const fetchVirtualCard = async (publicId: string) => {
  const VC = new api.VirtualCardsApi();
  const header = Auth.getAuthHeader();
  try {
    const virtualCard = await VC.getVirtualCard(publicId, header);
    return { ...virtualCard.data, isAdded: true };
  } catch (e) {
    console.log('error: ', e);
  }
};
