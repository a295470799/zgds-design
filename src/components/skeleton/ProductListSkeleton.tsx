import { Box, Skeleton } from "@mui/material";

export default function () {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px 10px" }}>
      {[1, 2, 3].map((item) => {
        return (
          <Box key={item}>
            <Skeleton
              variant="rounded"
              width={270}
              height={270}
              sx={{ marginBlockEnd: "20px" }}
            />
            <Skeleton
              variant="text"
              sx={{ marginBlockEnd: "5px", fontSize: "1.4rem" }}
            />
            <Skeleton
              variant="text"
              sx={{ marginBlockEnd: "10px", fontSize: "1.2rem" }}
            />
            <Box
              sx={{
                display: "fex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBlockEnd: "10px",
              }}
            >
              <Skeleton variant="rectangular" width={50} height={18} />
              <Skeleton variant="rectangular" width={95} height={30} />
            </Box>
            <Skeleton variant="rounded" width={270} height={30} />
          </Box>
        );
      })}
    </Box>
  );
}
