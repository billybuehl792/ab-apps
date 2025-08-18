import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import useClients from "@/store/hooks/useClients";
import ClientMenuItem from "@/containers/menu-items/ClientMenuItem";
import type { Client } from "@/store/types/clients";

type ClientSearchFieldProps = Omit<
  AutocompleteProps<
    Omit<Client, "id"> & { objectID: string },
    false,
    false,
    false
  >,
  "renderInput" | "options"
>;

const ClientSearchField = (props: ClientSearchFieldProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search.trim() || undefined, 500);

  /** Values */

  const navigate = useNavigate();
  const clients = useClients();

  /** Queries */

  const query = useQuery(clients.queries.search(debouncedSearch));

  /** Callbacks */

  const handleNavigateClient = (id: string) =>
    void navigate({ to: `/app/clients/${id}` });

  return (
    <Autocomplete
      value={null}
      selectOnFocus
      clearOnBlur
      autoHighlight
      fullWidth
      handleHomeEndKeys
      inputMode="search"
      size="small"
      noOptionsText="No Clients found"
      loading={query.isLoading}
      options={query.data?.hits ?? []}
      filterOptions={(options) => options}
      getOptionKey={(option) => option.objectID}
      getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
      isOptionEqualToValue={(option, value) =>
        option.objectID === value.objectID
      }
      renderInput={({
        InputProps: { startAdornment, endAdornment, ...InputProps },
        ...params
      }) => (
        <TextField
          type="search"
          inputMode="search"
          placeholder="Search Clients..."
          autoComplete="off"
          value={search}
          slotProps={{
            input: {
              startAdornment: (
                <>
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                  {startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {query.isLoading && (
                    <InputAdornment position="start">
                      <CircularProgress size={14} />
                    </InputAdornment>
                  )}
                  {endAdornment}
                </>
              ),
              ...InputProps,
            },
          }}
          {...params}
        />
      )}
      renderOption={({ key: _key, ...optionProps }, option) => (
        <ClientMenuItem
          key={option.objectID}
          client={{ id: option.objectID, ...option }}
          {...optionProps}
        />
      )}
      onInputChange={(_event, value) => {
        setSearch(value);
      }}
      onChange={(_event, newValue) => {
        if (newValue) handleNavigateClient(newValue.objectID);
      }}
      {...props}
    />
  );
};

export default ClientSearchField;
