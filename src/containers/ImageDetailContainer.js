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
    imageDetailInfo,
    imageDetailSize,
    isLandscape
  } = state.imagesFromCR;

  return {
    showImageDetail,
    imageDetailInfo,
    imageDetailSize,
    isLandscape
  };
};

const mapDispatchToProps = dispatch => {
    return (
        {
          toggleImageDetail: (showImageDetail) => {
            dispatch(toggleImageDetail(showImageDetail));
          },
          setImageDetailSize: (imageSize, isLandscape) => {
            dispatch(setImageDetailSize(imageSize, isLandscape));
          }
        }
    );
};

const ImageDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageDetail);

export default ImageDetailContainer;
