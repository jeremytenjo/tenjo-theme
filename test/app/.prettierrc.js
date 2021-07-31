module.exports = {
  printWidth: 90,
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
}

const removeEventListenersArray = []

console.log(vanillaDisclaimerBoxes.length)

/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, cloneElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mmc/theme-provider';
import DisclaimerBox, {
  createVanillaDisclaimerBox,
} from './disclaimer-box/disclaimer-box';
import getDataFromTextComponent from './handlers/getDataFromTextComponent';
import extractPriceValue from './handlers/extractPriceValue';
import renderOnlyDisclaimerButtons from './handlers/renderOnlyDisclaimerButtons';

export default function DisclaimerDialogue({
  text: TextComponent,
  disclaimerData,
  isLight,
}) {
  const theme = useTheme();
  const [textToDisplay, setTextToDisplay] = useState('');
  const [vanillaDisclaimerBoxes, setVanillaDisclaimerBoxes] = useState([]);

  if (!disclaimerData) return TextComponent;

  const { isRichText, isCommonI18N, textProp, textRaw } = useMemo(
    () => getDataFromTextComponent(TextComponent),
    [TextComponent],
  );

  const addDisclaimersToText = () => {
    const textHasDisclaimerSymbol = textRaw.match(/##/);
    if (!textHasDisclaimerSymbol) {
      setTextToDisplay(textRaw);
    } else {
      const textRawArray = textRaw.split(' ');
      const vanillaDisclaimerBoxesLocal = [];
      const Disclaimers = textRawArray.map((textFragment) => {
        const hashProperty = textFragment.match(/##([0-9]*)##/g);
        if (!hashProperty) return `${textFragment} `;

        const [hashValue] = hashProperty;
        const disclaimerId = hashValue.match(new RegExp('##(.*)##'))[1];
        const disclamerText = disclaimerData[disclaimerId] || '';

        if (isRichText) {
          const newVanillaDisclaimerBox = createVanillaDisclaimerBox({
            disclaimerId,
            disclamerText,
            theme,
            isLight,
          });
          vanillaDisclaimerBoxesLocal.push(newVanillaDisclaimerBox);

          return newVanillaDisclaimerBox.component;
        }

        return (
          <DisclaimerBox
            key={disclaimerId}
            disclaimerId={disclaimerId}
            disclamerText={disclamerText}
            isLight={isLight}
          />
        );
      });

      if (isRichText) {
        setVanillaDisclaimerBoxes(vanillaDisclaimerBoxesLocal);
        return setTextToDisplay(Disclaimers.join(' '));
      }

      setTextToDisplay(Disclaimers);
    }
  };

  useEffect(() => {
    if (!disclaimerData) return;

    if (disclaimerData && TextComponent && textRaw) {
      addDisclaimersToText();
    } else {
      setTextToDisplay(textRaw);
    }
  }, [TextComponent]);

  useEffect(() => {
    if (!disclaimerData) return;
    const removeEventListenersArray = [];

    if (vanillaDisclaimerBoxes.length) {
      vanillaDisclaimerBoxes.forEach((vanillaDisclaimerBox) => {
        const removeVanillaDisclaimerBoxesEventLister = vanillaDisclaimerBox.addEventListeners();
        removeEventListenersArray.push(removeVanillaDisclaimerBoxesEventLister);
      });
    }

    return () => {
      removeEventListenersArray.forEach((removeEventListener) => {
        if (removeEventListener) removeEventListener();
      });
    };
  }, [textToDisplay]);

  if (isCommonI18N) {
    return (
      <>
        {cloneElement(TextComponent, {
          options: {
            ...TextComponent.props.options,
            value: extractPriceValue(textRaw),
          },
        })}

        {renderOnlyDisclaimerButtons(textToDisplay)}
      </>
    );
  }

  return cloneElement(TextComponent, { [textProp]: textToDisplay });
}

DisclaimerDialogue.propTypes = {
  text: PropTypes.node.isRequired,
  disclaimerData: PropTypes.object,
  isLight: PropTypes.bool,
};

return create({
  base: 'dark',
  brandUrl: 'https://github.com/tenjojeremy/tenjo-apps',
  colorSecondary: primary,
  brandImage: 'https://useweb-lib.web.app/banner-sb.svg',
  ...storybook,
})

ReactDOM.render(<App />, document.getElementById('root'))
