import os
import sys

def print_folder_structure(root_dir, ignore_dirs=None):
    """
    Prints the folder structure of a directory, ignoring specified directories.

    Args:
        root_dir (str): The path to the root directory to start traversing.
        ignore_dirs (list): A list of directory names to ignore.
    """
    if ignore_dirs is None:
        ignore_dirs = []

    for root, dirs, files in os.walk(root_dir):
        # Filter out ignored directories in the current level for os.walk to skip
        # the contents of these directories automatically in subsequent iterations.
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        
        level = root.replace(root_dir, '').count(os.sep)
        indent = ' ' * 4 * level
        print(f'{indent} folder: {os.path.basename(root)}/')

        sub_indent = ' ' * 4 * (level + 1)
        for f in files:
            print(f'{sub_indent}file: {f}')

if __name__ == "__main__":
    # Specify the directory to start from. You can replace '.' with a specific path.
    start_directory = './portfolio_website/' 
    
    # Specify the directories to ignore.
    directories_to_ignore = ['node_modules', '.git']
    
    if not os.path.isdir(start_directory):
        print(f"Error: Directory not found at {start_directory}")
        sys.exit(1)

    print(f"--- Folder structure for '{os.path.abspath(start_directory)}' (ignoring {directories_to_ignore}) ---")
    print_folder_structure(start_directory, directories_to_ignore)
