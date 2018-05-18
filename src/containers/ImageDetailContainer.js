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
    imageDetailSize
  } = state.imagesFromCR;

  return {
    showImageDetail,
    imageDetailInfo,
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
