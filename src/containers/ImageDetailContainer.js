'use strict';

import { connect } from 'react-redux';
import ImageDetail from '../components/chat/ImageDetail';
import {
  toggleImageDetail,
  setImageDetailSize
} from '../actions/ImageActions';

const mapStateToProps = state => {
  const {
    showImageDetail,
    imageDetailUrl,
    imageDetailSize
  } = state.imagesFromCR;

  return {
    showImageDetail,
    imageDetailUrl,
    imageDetailSize
  };
};

const mapDispatchToProps = dispatch => {
    return (
        {
          toggleImageDetail: (showImageDetail) => {
            dispatch(toggleImageDetail(showImageDetail));
          },
          setImageDetailSize: (imageSize) => {
            dispatch(setImageDetailSize(imageSize));
          }
        }
    );
};

const ImageDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageDetail);

export default ImageDetailContainer;
