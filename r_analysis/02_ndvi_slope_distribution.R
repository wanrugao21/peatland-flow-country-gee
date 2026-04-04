setwd("C:/Users/高贝贝/Downloads")

install.packages("terra")

library(terra)
library(ggplot2)

# Load the NDVI trend slope raster
slope_raster <- rast("FlowCountry_NDVI_Trend.tif")  # adjust filename

# Sample pixels (e.g., 10,000 random samples) to avoid memory issues
set.seed(123)
slope_sample <- spatSample(slope_raster, size = 10000, values = TRUE, na.rm = TRUE, as.df = TRUE)
colnames(slope_sample) <- "slope"

# Create density plot with threshold lines
p <- ggplot(slope_sample, aes(x = slope)) +
  geom_density(fill = "#91bfdb", alpha = 0.6) +
  geom_vline(xintercept = c(-0.005, 0.005), linetype = "dashed", color = "red", size = 0.8) +
  annotate("text", x = -0.03, y = 5, label = "Negative", color = "red") +
  annotate("text", x = 0.03, y = 5, label = "Positive", color = "red") +
  annotate("text", x = 0, y = 8, label = "Stable", color = "darkgreen") +
  labs(x = "NDVI slope (year⁻¹)", y = "Density",
       title = "Distribution of NDVI trends (2020–2025)") +
  theme_bw(base_family = "serif") +
  theme(plot.title = element_text(hjust = 0.5, face = "bold"))

print(p)
ggsave("NDVI_slope_distribution.png", p, width = 4.5, height = 3, dpi = 300)
