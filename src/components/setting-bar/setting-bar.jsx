import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import InputField from '@/components/ui-kit/input-field/input-field';
import toolState from '@/store/tool';
import Line from '@/tools/line';
import Brush from '@/tools/brush';
import Eraser from '@/tools/eraser';
import styles from './setting-bar.module.scss';

export default observer(function () {
  const [isHideStrokeSetting, setIsHideStrokeSetting] = useState(true);

  const changeLineWidth = (event) => toolState.setLineWidth(event.target.value);
  const changeStrokeColor = (event) =>
    toolState.setStrokeColor(event.target.value);

  useEffect(() => {
    const isHide =
      toolState.tool instanceof Line ||
      toolState.tool instanceof Brush ||
      toolState.tool instanceof Eraser;

    setIsHideStrokeSetting(isHide);
  }, [toolState.tool]);

  return (
    <div className={styles['setting-bar']}>
      {toolState.tool && (
        <>
          <InputField
            id="Line width:"
            onChange={changeLineWidth}
            defaultValue={1}
            min={1}
            max={50}
            label="width"
            type="number"
          />

          {!isHideStrokeSetting && (
            <InputField
              label="Stroke color:"
              onChange={changeStrokeColor}
              type="color"
            />
          )}
        </>
      )}
    </div>
  );
});
