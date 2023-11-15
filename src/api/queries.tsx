import getApiUrl from "../config/urlConfig";
import { callApi } from "./callApi";
import { useAuth0 } from "@auth0/auth0-react";

export const getRequest = async (route: string, accessToken:string) => {
  const config = {
    url: `${getApiUrl()}${route}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  const { data, error } = await callApi(config, false);

  return {
    data: data || null,
    error
  };
};

export const deleteRequest = async (route: string, accessToken:string) => {
  const config = {
    url: `${getApiUrl()}${route}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  const { data, error } = await callApi(config, false);

  return {
    data: data || null,
    error
  };
};

export const postRequest = async (route: string, body: any, accessToken:string) => {
  const config = {
    url: `${getApiUrl()}${route}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: body
  };

  const { data, error } = await callApi(config, false);

  return {
    data: data || null,
    error
  };
};

export const patchRequest = async (route: string, body: any, accessToken:string) => {
  const config = {
    url: `${getApiUrl()}${route}`,
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: body
  };

  const { data, error } = await callApi(config, false);

  return {
    data: data || null,
    error
  };
};

export const getRequestRaw = async (route: string, accessToken:string) => {
  const config = {
    url: `${getApiUrl()}${route}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  const { response, error } = await callApi(config, true);

  return {
    response: response || null,
    error
  };
};

export const postRequestRaw = async (route: string, body: any, accessToken:string) => {
  const config = {
    url: `${getApiUrl()}${route}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: body
  };

  const { response, error } = await callApi(config, true);

  return {
    response: response || null,
    error
  };
};

export const patchRequestRaw = async (route: string, body: any, accessToken:string) => {
  const config = {
    url: `${getApiUrl()}${route}`,
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: body
  };

  const { response, error } = await callApi(config, true);

  return {
    response: response || null,
    error
  };
};
