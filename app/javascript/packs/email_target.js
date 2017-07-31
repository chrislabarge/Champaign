// @flow
import React from 'react';
import { render } from 'react-dom';
import { camelizeKeys } from '../util/util';
import ComponentWrapper from '../components/ComponentWrapper';
import EmailTargetView from '../email_target/EmailTargetView';

type Props = {
  locale: string,
  emailSubject?: string,
  country?: string,
  emailBody?: string,
  emailHeader?: string,
  emailFooter?: string,
  email?: string,
  name?: string,
  pageId: string | number,
  isSubmitting: boolean,
};

window.mountEmailTarget = (root: string, props: Props) => {
  const locale = window.champaign.personalization.member;
  render(
    <ComponentWrapper locale={props.locale}>
      <EmailTargetView {...camelizeKeys(props)} />
    </ComponentWrapper>,
    document.getElementById(root)
  );
};
