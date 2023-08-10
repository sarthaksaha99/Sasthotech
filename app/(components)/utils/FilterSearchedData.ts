import Fuse from "fuse.js";
let options = {
  keys: ["name"],
};
export const fileteredData = async (
  keyParam: string[],
  data: any,
  searchParam: string
) => {
  options.keys = keyParam;
  const fuse = new Fuse(data, options);
  const result = fuse.search(searchParam);

  const newArr = result.map((r: any) => {
    return { ...r.item };
  });
  // console.log(data);
  //setFilteredData(newArr);
  //  console.log(newArr);
  return newArr;
};
