'use strict';

import { connect } from 'react-redux';
import ImageDetail from '../components/chat/ImageDetail';

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

const ImageDetailContainer = connect(
    mapStateToProps,
    null
)(ImageDetail);

export default ImageDetailContainer;
