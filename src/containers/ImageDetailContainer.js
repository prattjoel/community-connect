'use strict';

import { connect } from 'react-redux';
import ImageDetail from '../components/chat/ImageDetail';
import {
  toggleImageDetail,
  setImageDetailSize,
  toggleImageDetailMenu
} from '../actions/ImageActions';

const mapStateToProps = state => {
  const {
    showImageDetail,
    imageDetailInfo,
    imageDetailSize,
    isLandscape,
    imageDetailMenuIsVisible
  } = state.imagesFromCR;

  return {
    showImageDetail,
    imageDetailInfo,
    imageDetailSize,
    isLandscape,
    imageDetailMenuIsVisible
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
          },
          toggleImageDetailMenu: (imageDetailMenuIsVisible) => {
            dispatch(toggleImageDetailMenu(imageDetailMenuIsVisible));
          }
        }
    );
};

const ImageDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageDetail);

export default ImageDetailContainer;
