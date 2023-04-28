import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function () {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={260}
        height={48}
        sx={{ marginBottom: "35px" }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TableContainer sx={{ width: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40%">
                  <Skeleton variant="rounded" width={92} height={20} />
                </TableCell>
                <TableCell align="center" width="20%">
                  <Skeleton
                    variant="rounded"
                    width={92}
                    height={20}
                    sx={{ margin: "0 auto" }}
                  />
                </TableCell>
                <TableCell align="center" width="20%">
                  <Skeleton
                    variant="rounded"
                    width={92}
                    height={20}
                    sx={{ margin: "0 auto" }}
                  />
                </TableCell>
                <TableCell align="right" width="20%">
                  <Skeleton
                    variant="rounded"
                    width={92}
                    height={20}
                    sx={{ display: "inline-block" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return (
                  <TableRow key={item}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "10px",
                          height: "70px",
                        }}
                      >
                        <Skeleton variant="rounded" width={20} height={20} />
                        <Skeleton variant="rounded" width={70} height={70} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                            lineHeight: 1,
                          }}
                        >
                          <Box>
                            <Skeleton variant="text" width={90} height={18} />
                            <Skeleton variant="text" width={90} height={18} />
                          </Box>
                          <Skeleton variant="rounded" width={20} height={20} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        variant="text"
                        width={60}
                        height={18}
                        sx={{ margin: "0 auto" }}
                      />
                      <Skeleton
                        variant="text"
                        width={60}
                        height={18}
                        sx={{ margin: "0 auto" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        variant="rounded"
                        width={95}
                        height={30}
                        sx={{ margin: "0 auto" }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton
                        variant="text"
                        width={60}
                        height={18}
                        sx={{ display: "inline-block" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Skeleton variant="rounded" width={280} height={284} />
      </Box>
    </>
  );
}
