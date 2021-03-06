import { logEvent } from './../packs/log_event';
[
  'page:arrived',
  'form:update',
  'member:set',
  'member:reset',
].forEach(eventName => {
  const callback = (e, ...rest) => logEvent(eventName, ...rest);
  $.subscribe(eventName, callback);
});

$.publish('page:arrived');
