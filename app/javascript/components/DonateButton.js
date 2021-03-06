// @flow
import React from 'react';
import Button from './Button/Button';
import CurrencyAmount from './CurrencyAmount';
import ProcessingThen from './ProcessingThen';
import { FormattedMessage } from 'react-intl';
import './DonateButton.css';

type OwnProps = {
  currency: string;
  amount?: number;
  submitting?: boolean;
  recurring?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default (props: OwnProps) => (
  <Button className="DonateButton" onClick={props.onClick} disabled={props.disabled}>
    <ProcessingThen processing={props.submitting || false}>
      <span className="fa fa-lock" />&nbsp;
      <FormattedMessage
        id={ props.recurring ? 'fundraiser.donate_monthly' : 'fundraiser.donate' }
        defaultMessage="Donate {amount}"
        values={{
          amount: (<CurrencyAmount amount={props.amount || 0} currency={props.currency} />)
        }}
      />
    </ProcessingThen>
  </Button>
);
