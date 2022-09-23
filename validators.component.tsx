import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import "ojs/ojinputtext";
import 'ojs/ojbutton';
import 'ojs/ojlabel';

export default function ValidatorComponent (props: any) {
  const [isPrivateEvent, setIsPrivateEvent] = useState(true);
  const [eventCode, setEventCode] = useState('');
  const [rawPrivateEventCodeLength, setRawPrivateEventCodeLength] = useState(0);

  const eventCodeAsyncValidator = {
    validate: (value: string | number) => {
      function resolveAfter2Seconds (v: any) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (v?.length < 8) {
              reject('Server Error: rejected');
            }
            resolve(v);
          }, 2000);
        });
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolveAfter2Seconds(value)
            .then((result) => {
              resolve(result);
            })
            .catch((e) => {
              reject({ detail: 'The code you entered is not valid. Please try again.' });
            });
        }, 2000);
      });
    }
    // ,
    // hint: new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('Enter less than 8 chars code to see an error that occurs after a second.');
    //   }, 1000);
    // })
  };

  const eventCodeValidator = {
    validate: function (value: any) {
      if (!value) return true;
      else if (value?.trim()?.length < 6) {
        return false;
      } else if (value?.trim()?.length >= 6 && value === '123456') {
        throw new Error('Invalid Event Code');
      }
      return true;
    },
    getHint: function () {
      return null;
    }
  };

  return (
    <div id='privateEvent'>
        <div className = 'oj-flex'>
            {
                    <div className = "oj-flex-item oj-sm-padding-2x-horizontal">
                        <oj-input-text
                            label-edge = 'inside'
                            clearIcon ='conditional'
                            length = {{ countBy: 'codeUnit', max: 20 }}
                            class=""
                            validators = {[eventCodeValidator, eventCodeAsyncValidator]}
                            label-hint = {'Enter Code'}
                            aria-label = 'Enter code'
                            value = {eventCode}
                            onvalueChanged = {(e: any) => setEventCode(e.target.value)}>
                        </oj-input-text>
                        <oj-button
                            chroming = 'callToAction'
                            id = 'applyCodeBtn'
                            class = 'oj-md-margin-4x-start oj-md-margin-2x-top'
                            aria-label = 'Apply code'
                            disabled = {eventCode?.length < 6}
                            onojAction = {() => {}}>
                                {'Apply'}
                        </oj-button>
                    </div>
             }
          <div>
          </div>
        </div>
    </div>
  );
}
