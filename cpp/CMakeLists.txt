cmake_minimum_required(VERSION 3.13)

project(TurboLnd)

set(CMAKE_VERBOSE_MAKEFILE on)
set(CMAKE_CXX_STANDARD 20)

add_compile_options(-fexceptions -frtti -std=c++17)

# Define all the .cpp files as source_files
file(GLOB source_files CONFIGURE_DEPENDS *.cpp)
# Build a static library from the source files
add_library(TurboLnd STATIC ${source_files})

# Add headers search paths
target_include_directories(TurboLnd PUBLIC .)

# Finally link the library with the codegen specs
target_link_libraries(TurboLnd react_codegen_RNTurboLndSpec)



# lnd
# add_library(lib_lnd SHARED IMPORTED)
# set_property(TARGET lib_lnd PROPERTY IMPORTED_NO_SONAME 1)
# # set_target_properties(lib_lnd PROPERTIES IMPORTED_LOCATION ${CMAKE_CURRENT_SOURCE_DIR}/liblnd/${CMAKE_ANDROID_ARCH_ABI}/liblnd.so)
# set_target_properties(lib_lnd PROPERTIES IMPORTED_LOCATION ${CMAKE_CURRENT_SOURCE_DIR}/../../../android/app/src/main/jniLibs/${CMAKE_ANDROID_ARCH_ABI}/liblnd.so)

# target_link_libraries(TurboLnd lib_lnd)
# # target_link_libraries(${CMAKE_PROJECT_NAME} lib_lnd)


# include_directories(${CMAKE_CURRENT_SOURCE_DIR}/liblnd/${CMAKE_ANDROID_ARCH_ABI}/)

# lnd

set(DEFAULT_LND_JNILIBS_PATH "${CMAKE_CURRENT_SOURCE_DIR}/../../../android/app/src/main/jniLibs")

if(LND_JNILIBS_PATH)
    set(FINAL_LND_JNILIBS_PATH ${LND_JNILIBS_PATH})
else()
    set(FINAL_LND_JNILIBS_PATH ${DEFAULT_LND_JNILIBS_PATH})
endif()

# Construct the full path to liblnd.so
set(LND_LIBRARY_PATH "${FINAL_LND_JNILIBS_PATH}/${CMAKE_ANDROID_ARCH_ABI}/liblnd.so")

if(NOT EXISTS ${LND_LIBRARY_PATH})
    message(FATAL_ERROR "liblnd.so not found at ${LND_LIBRARY_PATH}")
endif()


add_library(lib_lnd SHARED IMPORTED)
set_property(TARGET lib_lnd PROPERTY IMPORTED_NO_SONAME 1)
set_target_properties(lib_lnd PROPERTIES IMPORTED_LOCATION ${LND_LIBRARY_PATH})

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/liblnd/${CMAKE_ANDROID_ARCH_ABI}/)

# target_include_directories(TurboLnd PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/liblnd/${CMAKE_ANDROID_ARCH_ABI}/)


target_link_libraries(TurboLnd lib_lnd)

find_library( # Sets the name of the path variable.
        log-lib

        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log)
target_link_libraries( # Specifies the target library.
        TurboLnd

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib} )
