'use strict';

import { connect } from 'react-redux';
import ImageDetail from '../components/chat/ImageDetail';
import {
  toggleImageDetail,
} from '../actions/ImageActions';

const mapStateToProps = state => {
  const {
    showImageDetail,
    imageDetailUrl
  } = state.imagesFromCR;

  return {
    showImageDetail,
    imageDetailUrl
  };
};

const mapDispatchToProps = dispatch => {
    return (
        {
          toggleImageDetail: (showImageDetail) => {
            dispatch(toggleImageDetail(showImageDetail));
          },
        }
    );
};

const ImageDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageDetail);

export default ImageDetailContainer;
