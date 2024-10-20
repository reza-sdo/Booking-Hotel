import { Fragment, useRef, useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
import useOutsideClick from '../../hooks/useOutSideClick';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get('destination') || ''
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  //================== hooks ==================

  const navigate = useNavigate();

  //================== handlers ==================

  const optionsChangeHandler = (type, operation) => {
    setOptions((pre) => ({
      ...pre,
      [type]: operation === 'inc' ? +options[type] + 1 : +options[type] - 1,
    }));
  };

  const searchHandler = () => {
    // if each property is object or array you have to use createSearchParams
    const encodedParam = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    // console.log(encodedParam);
    // setSearchParams(encodedParam);

    // and pass it like this
    // and convert it to string
    navigate({
      pathname: '/hotels',
      search: encodedParam.toString(),
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="">
          <Link to="/bookmark">Bookmarks</Link>
        </div>
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            onClick={() => setOpenDate((pre) => !pre)}
            className="dateDropDown"
          >
            {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
              date[0].endDate,
              'MM/dd/yyyy'
            )}`}
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              className="date"
              ranges={date}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            onClick={() => setOpenOptions((pre) => !pre)}
          >
            {Object.keys(options).map((op, index) => (
              <Fragment key={index}>
                {op} : {options[op]}
                {Object.keys(options).length !== index + 1 && <>&bull;</>}
              </Fragment>
            ))}
            {/* 1 adult &bull; children &bull; 1 room */}
          </div>
          {openOptions && (
            <GuestOptionList
              handleOptions={optionsChangeHandler}
              options={options}
              setOpenOptions={setOpenOptions}
            />
          )}

          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button onClick={searchHandler} className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
        <div className="">
          <Link to="/login">login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
//=================================================================
function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, 'optionDropDown', () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      {/* <OptionItem type /> */}
      {Object.keys(options).map((op, index) => (
        <OptionItem
          key={index}
          handleOptions={handleOptions}
          type={op}
          options={options}
        />
      ))}
    </div>
  );
}
//=================================================================

function OptionItem({ type, options, handleOptions }) {
  const minLimitHandler = () => {
    switch (type) {
      case 'adult':
        return 1;
      case 'children':
        return 0;
      case 'room':
        return 1;
    }
  };
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          disabled={options[type] === minLimitHandler()}
          className="optionCounterBtn"
          onClick={() => handleOptions(type, 'dec')}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, 'inc')}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
