import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ListItem from "./ListItem";

const movies = [
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABS1msNBVlgbivqosEj56HVJTnOS-K22rwRLP5FzX6hpWrwhCNlkbdSP6zd2fmQtL5oZOh2DiSqS-lp6JCODyhXicAehY0JT5T3eed7xmVsz5brM8iztrVhQfkhGyDqjFkNOwmZhVTXAbFoUN5WFHiOzwyl_ozoB87XI.webp?r=97b",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRLtg7R1cnhiO_GWnCo-yIx-dHPUjzGeCEg3mQghFFtp5O_9Uh0t6xT07CKldDc2NXvsl6dcZHS1kQoBdzyXonemNrkGh4IhZd4.webp?r=7df",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABQjLKjR72VdWFJhj4tgetXl-M574ryyh5gt4rGAmINfEj-vjamHRZnxdVIeu4upqxZGYh6Afgc9HdHho7kbbPemJBXyTXC3iZvi1wFP0SOBowpsgNHnofxr3dvtUPLt8w-Qf.jpg?r=ac1",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABS0PIXUS3pOaRin_B9HmzTFXB4-o9p-kJRKLwRkg_dkOwsSdD7dt2V5-3duHVGI_DdetR9gebIrBaOeBLVUcWkDSC1K7PC2uzhpu5H9EWVA0UqnppzIN40ekyUKLxK0Z4M0r.jpg?r=2bf",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABckxAIROrofnMMI5lDKxVtgQfL1zvqnH1_6oep__9j56p698FvkK7S8_IwWFnP-S9vJlpi24j1aUY1Vy0nO21HYRF6N2ME_GkJurbNIV2ryXfmXo-KB3PMDFbwwTQ_2QaeF7f7XmoGXAiol4qXOTe7La3YLd5W0Mh2Bh3-LOJa8HoOQ7HqoU01kQykUr3XbCIdY3mKwuM2Hp7MaZO_qpVVxXynpY_kIJvbVMkvCSpBB7w_J_oxLfmCyP7UHT0K91i-2NwaoWUjY21w6M2L6dYfk7GKEsfUHRY-GI9pG94KjbwXQFqEqkfwqJ1RkoHpfE3sljIqTQEG47UOUifTy8fTS75topUhsVl5Orx_Qwf8ME3dTZweupNS5G3MdKQdg3g_5B8t9upSC0RbnI_Zjo9LB7YRfn1vN-0mhZkGRGJ-ITZdMlt4rpAiKxlGx-tk7-SgKOSY6OtgEGpKU5qGv2xMAm3ZpZnyOKHHo87RE.webp?r=27e",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABckxAIROrofnMMI5lDKxVtgQfL1zvqnH1_6oep__9j56p698FvkK7S8_IwWFnP-S9vJlpi24j1aUY1Vy0nO21HYRF6N2ME_GkJurbNIV2ryXfmXo-KB3PMDFbwwTQ_2QaeF7f7XmoGXAiol4qXOTe7La3YLd5W0Mh2Bh3-LOJa8HoOQ7HqoU01kQykUr3XbCIdY3mKwuM2Hp7MaZO_qpVVxXynpY_kIJvbVMkvCSpBB7w_J_oxLfmCyP7UHT0K91i-2NwaoWUjY21w6M2L6dYfk7GKEsfUHRY-GI9pG94KjbwXQFqEqkfwqJ1RkoHpfE3sljIqTQEG47UOUifTy8fTS75topUhsVl5Orx_Qwf8ME3dTZweupNS5G3MdKQdg3g_5B8t9upSC0RbnI_Zjo9LB7YRfn1vN-0mhZkGRGJ-ITZdMlt4rpAiKxlGx-tk7-SgKOSY6OtgEGpKU5qGv2xMAm3ZpZnyOKHHo87RE.webp?r=27e",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZP02TbVpuDoCLLE8L0NcmFTCh56Ya5w3RG_obT3V0aVP3XfiVD4sQFlEXCT5vnx2qIud478dZJ8Cczm7eCf_lSXWtMBnwBmZrdXK19ijfOPmjkGEmmExsM6VYKyX8TBhwl4.jpg?r=a9f",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABWk6ZSNGqESuhvwbkXs32JnSFdrovRvFsgSc1HeYIKLmjKqujx05UM2EdrsHkfXl19pJsK2IcKU_V6duCdYWo9lArthW5wV6vg-_z0niuFji-_tpsZa5JBxlqbODm7t_J23D5ZLdtK2Hsfbh0gBf02VDKXJrzQrZgq3TR0IDpJSb7ISsNGQld4aVWveRQnDmkJBtFpqggRzzN67rqKgZ6cNCh9ep02N1BwwA6T_QF0nPuHcIoRb5ykDGN6IbXb5x-v5n8-CxgkgmxXKJa_DgVf1bBZHDQgFs8K21fUdZFVE5EFpXb-kU1ZzDCv3636IBjsXjYvpavh0aclB_DPjor6AV8M7oo6ygsT3D26XNzbh5viLQKWhVk90pKEH6IsYQM2hbS5gjKKLYMDiYDWCJxe7tzfWTULZlHL2i79LbWjfM.webp?r=e1b",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABU7b0jNrdYpDot-lB37i_dOVC0lPPNkKtQNXYjyVbcgW3ksr0q_dcAc2otniXTLw4Umbs1vg2E_oUoespckGh_F8ukBRRt7mruBtIc_a148aWYk3ARigLDsFChRe_IbFa36jcvqyRQlUBOjkMvmi9LQKEz994Byd0aOpaMv9Xie48817eMI_51WSFQtMCgeKFU6aaIRVd38RzoYhkngZGHAhYSZK-jHbRrRmetGBcQcnFqeU16_ZtbKEPYIVlyca1jgjxlRQkELBOhgfG8H07225kUPW3vafyn4v4C725fgeKupveyfCa8dN5NBui_ZQdeNROW7kw1hDWF8VeZDx4OpKO0VmDZz6ft5rajdwDg8l-l2IBkSA407_uU4ubIt1L9o4iuQMm0L6KPdFkgqdva_XuW0nqjQigOOFcdOPSfZf9UrsBAV1_1YY6SGQMg07BbsVp_x9kr1YdPPOtmr1ldxchJBORdJ_FzTY4lo.webp?r=28a",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABWhV-O2BgSekA94pIn4cNobx1btafjnNR9CCp13UVfF7KKcXOCy6UTQ6ebyVe-GXwsln1z1YGT_StbefYm8LDcy1wiDQeh4F7C8.webp?r=23a",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRyXSqu7fgl0Agd-EKyZKbYmooB8odk_tHczQ7u39wePtX1f3N9nqdW_wKFXklTGlnFR6blUBtndp_xfljayyBO3xdB6Vu6OiUI.webp?r=71e",
  "https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTVCpI-dIbqB4aWRl81jmx2v0Zjjsg7Rp2ZdYWWVm6d4CnTzQyolIDaf-klZQ2l1LZ-R-CX2dvaZu0YUobS5EK1bFkolzgCv308B-gim6FSZwYOLkfVPrSFXgO-kAKrCRsrO.jpg?r=30a"
];
const List = ({ listId, title }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider" + listId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + listId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <div className="w-full mt-14 pl-5 h-full relative">
      <h1 className="text-white text-xl font-bold ml-12 mb-5 select-none">
        {title}
      </h1>
      <div className="relative flex items-center group  ">
        <MdArrowBackIosNew
          onClick={slideLeft}
          className="bg-zinc-900 text-white rounded h-full w-[50px] opacity-50 absolute left-0 top-0 bottom-0 m-auto cursor-pointer z-30 hidden hover:opacity-75 group-hover:block select-none"
          size={40}
        />
        <div
          id={"slider" + listId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie, index) => (
            <ListItem key={index} item={movie} index={index} />
          ))}
        </div>
        <MdArrowForwardIos
          onClick={slideRight}
          className="bg-zinc-900 text-white rounded h-full w-[50px] opacity-50 absolute right-0 top-0 bottom-0 m-auto cursor-pointer z-30 hidden hover:opacity-75 group-hover:block select-none"
          size={40}
        />
      </div>
    </div>
  );
};

export default List;
