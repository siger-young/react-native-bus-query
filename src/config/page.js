import Splash from '../pages/Splash';
import LineList from '../pages/LineList';
import LineInfo from '../pages/LineInfo';

exports.Splash = {
    component: Splash,
};

exports.LineList = {
    component: LineList,
    params: {
      title: "选择路线",
    }
};

exports.LineInfo = {
    component: LineInfo,
};
