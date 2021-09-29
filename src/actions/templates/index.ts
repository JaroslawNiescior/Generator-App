import * as types from './types';
import api from '../../api';
import history from '../../history';
import { ROUTES } from '../../components/consts';
import { Template } from '../../components/types/templates/types';

export const createTemplate =
  (newTemplate: Partial<Template>) => async (dispatch: any) => {
    const response = await api.post('/templates', { ...newTemplate });
    dispatch({ type: types.CREATE_TEMPLATE, payload: response.data });
    history.push(ROUTES.templates.href);
  };

export const updateTemplate =
  (id: string, updatedTemplate: Partial<Template>) => async (dispatch: any) => {
    const response = await api.patch(`/templates/${id}`, updatedTemplate);
    dispatch({ type: types.UPDATE_TEMPLATE, payload: response.data });
    history.push(ROUTES.templates.href);
  };

export const fetchTemplate = (id: string) => async (dispatch: any) => {
  const response = await api.get(`/templates/${id}`);
  dispatch({ type: types.FETCH_TEMPLATE, payload: response.data });
};

export const deleteTemplate = (id: string) => async (dispatch: any) => {
  await api.delete(`/templates/${id}`);
  dispatch({ type: types.DELETE_TEMPLATE, payload: id });
};

export const fetchTemplates = () => async (dispatch: any)=> {
  const response = await api.get('/templates');
  dispatch({ type: types.FETCH_TEMPLATES, payload: response.data });
  return response.data;
};
