import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Position from "./Position";

const SubSubCategory = () => {
  const [value, setValue] = React.useState([]);
  const [open, toggleOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({
    from: 1,
    title: ""
  });
  const inputPos = useRef(null);
  const inputTitle = useRef(null);
  const filter = createFilterOptions();

  const onChange = (event, newValue) => {
    const processVal = newValue.map((item, index) => ({
      title:
        typeof item === "string"
          ? item
          : item.inputValue
          ? item.inputValue
          : item.title,
      year: item.year ? item.year : ""
    }));

    setValue([...processVal]);
  };

  const onFilter = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== "") {
      filtered.push({
        inputValue: params.inputValue,
        title: `Add "${params.inputValue}"`
      });
    }

    return filtered;
  };

  const getOption = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.title;
  };

  const renderInput = (params) => (
    <TextField {...params} label="Add Sub Sub Category" variant="outlined" />
  );

  const onDrag = (from, title) => {
    setDialogContent({
      from,
      title
    });

    toggleOpen(true);
  };

  const renderTags = (value, getTagProps) =>
    value.map((option, index) => (
      <div key={index} className="chip">
        <div
          className="dragable-area"
          onClick={() => onDrag(index + 1, option.title)}
        ></div>
        <Chip
          variant="outlined"
          label={option.title}
          icon={<Position index={index + 1} />}
          {...getTagProps({ index })}
        />
      </div>
    ));

  const handleClose = () => {
    toggleOpen(false);
  };

  const updateInfo = (from, to, title) => {
    if (Object.prototype.toString.call(value) !== "[object Array]") {
      throw new Error("Please provide a valid array");
    }

    var item = value.splice(from, 1);

    item[0].title = title;

    if (!item.length) {
      throw new Error("There is no item in the array at index " + from);
    }

    value.splice(to, 0, item[0]);

    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const to = inputPos.current.value - 1;
    const from = dialogContent.from - 1;
    const title = inputTitle.current.value;

    updateInfo(from, to, title);
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        multiple
        value={value}
        onChange={onChange}
        filterOptions={onFilter}
        id="sub-sub-category"
        options={top100Films}
        getOptionLabel={getOption}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.title}
        style={{ width: 300 }}
        freeSolo
        renderInput={renderInput}
        renderTags={renderTags}
        openOnFocus={true}
        getOptionDisabled={(option) =>
          Boolean(
            value.find((item) => {
              return item.title === option.title;
            })
          )
        }
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Update the info</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="title"
              type="text"
              defaultValue={dialogContent.title}
              inputRef={inputTitle}
            />
            <TextField
              margin="dense"
              label="position"
              type="number"
              defaultValue={dialogContent.from}
              inputRef={inputPos}
              inputProps={{
                min: "1"
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "Fight Club", year: 1999 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 }
];

export default SubSubCategory;
