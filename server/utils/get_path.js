const path = require('path');
module.exports = (cpath1, path1, path2) => {
  let pathFromProjRoot = path.resolve();
  pathFromProjRoot = pathFromProjRoot.split('vaccine-app')[1];
  if (pathFromProjRoot == cpath1) {
    return path1;
  }
  return path2;
}
