import os
from PIL import Image
import imagehash

def remove_identical_images(folder_path):
    # Create a dictionary to store the image hashes
    image_hashes = {}

    # Iterate over all files in the folder
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        # Check if the file is an image
        if os.path.isfile(file_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            try:
                # Open the image and compute its hash
                image = Image.open(file_path)
                image_hash = str(imagehash.average_hash(image))

                # Check if the hash already exists in the dictionary
                if image_hash in image_hashes:
                    # If the hash exists, delete the duplicate image
                    os.remove(file_path)
                    print(f"Removed duplicate image: {filename}")
                else:
                    # If the hash doesn't exist, add it to the dictionary
                    image_hashes[image_hash] = file_path
            except (IOError, OSError):
                print(f"Unable to process file: {filename}")

# Specify the folder path
folder_path = 'Path to dedup imgs folder'

before_size = sum(os.path.getsize(os.path.join(folder_path, f)) for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)))

# Call the function to remove identical images
remove_identical_images(folder_path)

# Print the size of the folder before and after removing identical images
after_size = sum(os.path.getsize(os.path.join(folder_path, f)) for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)))

print(f"Size of folder before removing identical images: {before_size} bytes")
print(f"Size of folder after removing identical images: {after_size} bytes")
# Call the function to remove identical images
remove_identical_images(folder_path)