import React, { useEffect, useState } from 'react';
import { validateIso } from '../../utils/validate_iso.js';
import { Audio } from 'react-loader-spinner';

const DataBlock = ({iso, error, onErrorChange, endpoint, getContents, classNm}) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datasetUrl = '/api/' + endpoint + '?date=' + iso;
        let result = await fetch(datasetUrl);
        result = await result.json();
        if (result) {
          setData(result.data);
          onErrorChange({error: !result.success, msg: result.error});
          setIsFetching(false);
        }
      } catch (e) {
          onErrorChange({error: true, msg: 'Unable to connect to server'})
      }
    }

    setIsFetching(true);
    const validation = validateIso(iso);
    if (validation.valid) {
      fetchData();
    } else {
      onErrorChange({error: true, msg: validation.msg});
    }
    return () => setIsFetching(false);
  }, [iso, endpoint, onErrorChange])

  let contents;

  if(isFetching) {
    contents = <Audio color="grey" height={50} width={50} />;
  } else if(data && typeof getContents === 'function') {
    contents = getContents(data);
  } else {
    contents = null;
  }

  return (
    <div className={classNm}>
      {contents}
    </div>
  )
}

export default DataBlock;
